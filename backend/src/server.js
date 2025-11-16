const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const config = require('./config/config');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const logger = require('./utils/logger');

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Note: unsafe-inline required for Vite dev
      styleSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://api.openweathermap.org", "https://*.tile.openstreetmap.org"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      upgradeInsecureRequests: config.nodeEnv === 'production' ? [] : null
    }
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  hidePoweredBy: true,
  noSniff: true,
  xssFilter: true,
  frameguard: {
    action: 'deny'
  }
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
  logger.http(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
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

// Validate required environment variables
const validateEnv = () => {
  const required = ['OPENWEATHER_API_KEY'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    logger.error(`Missing required environment variables: ${missing.join(', ')}`);
    logger.error('Please check your .env file and ensure all required variables are set.');
    process.exit(1);
  }

  logger.info('✓ Environment variables validated');
};

// Start server
const PORT = config.port;

// Validate environment before starting
validateEnv();

app.listen(PORT, () => {
  logger.info(`🌤️  Weather Dashboard Backend running on port ${PORT}`);
  logger.info(`🔧 Environment: ${config.nodeEnv}`);
  logger.info(`🌍 CORS enabled for: ${config.cors.origin}`);
});

module.exports = app;
