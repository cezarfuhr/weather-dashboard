const express = require('express');
const router = express.Router();
const weatherRoutes = require('./weatherRoutes');

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Weather Dashboard API is running',
    timestamp: new Date().toISOString()
  });
});

// Weather routes
router.use('/weather', weatherRoutes);

module.exports = router;
