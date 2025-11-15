const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Get current weather
router.get('/current', weatherController.getCurrentWeather);

// Get forecast
router.get('/forecast', weatherController.getForecast);

// Get weather alerts
router.get('/alerts', weatherController.getAlerts);

// Get historical data
router.get('/historical', weatherController.getHistorical);

// Get air pollution data
router.get('/pollution', weatherController.getAirPollution);

// Geocoding
router.get('/geocode', weatherController.geocodeCity);

// Reverse geocoding
router.get('/reverse-geocode', weatherController.reverseGeocode);

module.exports = router;
