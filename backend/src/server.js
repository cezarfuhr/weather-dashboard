const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const config = require('./config/config');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://api.openweathermap.org", "https://*.tile.openstreetmap.org"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: config.cors.origin,
  credentials: true,
  exposedHeaders: ['Content-Length', 'X-Requested-With']
}));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api', rateLimiter);

// PWA support headers
app.use((req, res, next) => {
  // Service Worker caching headers
  if (req.path.includes('/api/')) {
    res.setHeader('Cache-Control', 'public, max-age=600'); // 10 minutos
  }
  next();
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Weather Dashboard Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      current: '/api/weather/current',
      forecast: '/api/weather/forecast',
      alerts: '/api/weather/alerts',
      historical: '/api/weather/historical',
      pollution: '/api/weather/pollution',
      geocode: '/api/weather/geocode',
      reverseGeocode: '/api/weather/reverse-geocode'
    }
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { message: 'Endpoint not found' }
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🌤️  Weather Dashboard Backend running on port ${PORT}`);
  console.log(`🔧 Environment: ${config.nodeEnv}`);
  console.log(`🌍 CORS enabled for: ${config.cors.origin}`);
});

module.exports = app;
