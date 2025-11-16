const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { validate, schemas } = require('../middleware/validation');
const Joi = require('joi');

// Validation schemas for routes
const currentWeatherSchema = {
  query: schemas.coordinates.keys(),
};

const forecastSchema = {
  query: schemas.coordinates.keys().append(schemas.days.keys()),
};

const historicalSchema = {
  query: schemas.coordinates.keys().append(schemas.timestamp.keys()),
};

const geocodeSchema = {
  query: schemas.city.keys(),
};

const reverseGeocodeSchema = {
  query: schemas.coordinates.keys(),
};

// Routes with validation
router.get('/current', validate(currentWeatherSchema), weatherController.getCurrentWeather);
router.get('/forecast', validate(forecastSchema), weatherController.getForecast);
router.get('/alerts', validate(currentWeatherSchema), weatherController.getAlerts);
router.get('/historical', validate(historicalSchema), weatherController.getHistorical);
router.get('/pollution', validate(currentWeatherSchema), weatherController.getAirPollution);
router.get('/geocode', validate(geocodeSchema), weatherController.geocodeCity);
router.get('/reverse-geocode', validate(reverseGeocodeSchema), weatherController.reverseGeocode);

module.exports = router;
