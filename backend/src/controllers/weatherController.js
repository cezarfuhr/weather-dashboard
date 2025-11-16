const weatherService = require('../services/weatherService');

class WeatherController {
  async getCurrentWeather(req, res, next) {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        return res.status(400).json({
          success: false,
          error: { message: 'Latitude and longitude are required' }
        });
      }

      const data = await weatherService.getCurrentWeather(
        parseFloat(lat),
        parseFloat(lon)
      );

      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async getForecast(req, res, next) {
    try {
      const { lat, lon, days = 10 } = req.query;

      if (!lat || !lon) {
        return res.status(400).json({
          success: false,
          error: { message: 'Latitude and longitude are required' }
        });
      }

      const data = await weatherService.getForecast(
        parseFloat(lat),
        parseFloat(lon),
        parseInt(days)
      );

      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async getAlerts(req, res, next) {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        return res.status(400).json({
          success: false,
          error: { message: 'Latitude and longitude are required' }
        });
      }

      const data = await weatherService.getWeatherAlerts(
        parseFloat(lat),
        parseFloat(lon)
      );

      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async getHistorical(req, res, next) {
    try {
      const { lat, lon, timestamp } = req.query;

      if (!lat || !lon || !timestamp) {
        return res.status(400).json({
          success: false,
          error: { message: 'Latitude, longitude and timestamp are required' }
        });
      }

      const data = await weatherService.getHistoricalData(
        parseFloat(lat),
        parseFloat(lon),
        parseInt(timestamp)
      );

      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async getAirPollution(req, res, next) {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        return res.status(400).json({
          success: false,
          error: { message: 'Latitude and longitude are required' }
        });
      }

      const data = await weatherService.getAirPollution(
        parseFloat(lat),
        parseFloat(lon)
      );

      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async geocodeCity(req, res, next) {
    try {
      const { city } = req.query;

      if (!city) {
        return res.status(400).json({
          success: false,
          error: { message: 'City name is required' }
        });
      }

      const data = await weatherService.geocodeCity(city);

      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async reverseGeocode(req, res, next) {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        return res.status(400).json({
          success: false,
          error: { message: 'Latitude and longitude are required' }
        });
      }

      const data = await weatherService.reverseGeocode(
        parseFloat(lat),
        parseFloat(lon)
      );

      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WeatherController();
