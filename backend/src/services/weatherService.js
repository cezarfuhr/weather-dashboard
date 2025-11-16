const axios = require('axios');
const config = require('../config/config');
const { getFromCache, setInCache } = require('../utils/cache');

class WeatherService {
  constructor() {
    this.apiKey = config.openWeather.apiKey;
    this.baseUrl = config.openWeather.baseUrl;
    this.geoUrl = config.openWeather.geoUrl;
  }

  async getCurrentWeather(lat, lon) {
    const cacheKey = `current_${lat}_${lon}`;
    const cached = getFromCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric',
          lang: 'pt_br'
        }
      });

      setInCache(cacheKey, response.data, 300); // 5 minutes
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getForecast(lat, lon, days = 10) {
    const cacheKey = `forecast_${lat}_${lon}_${days}`;
    const cached = getFromCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      // OneCall API 3.0 for 10-day forecast
      const response = await axios.get(`${this.baseUrl}/forecast/daily`, {
        params: {
          lat,
          lon,
          cnt: days,
          appid: this.apiKey,
          units: 'metric',
          lang: 'pt_br'
        }
      });

      setInCache(cacheKey, response.data, 600); // 10 minutes
      return response.data;
    } catch (error) {
      // Fallback to regular 5-day forecast
      try {
        const response = await axios.get(`${this.baseUrl}/forecast`, {
          params: {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric',
            lang: 'pt_br'
          }
        });

        setInCache(cacheKey, response.data, 600);
        return response.data;
      } catch (fallbackError) {
        throw this.handleError(fallbackError);
      }
    }
  }

  async getWeatherAlerts(lat, lon) {
    const cacheKey = `alerts_${lat}_${lon}`;
    const cached = getFromCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      // Using OneCall API for alerts
      const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          exclude: 'current,minutely,hourly,daily',
          lang: 'pt_br'
        }
      });

      const alerts = response.data.alerts || [];
      setInCache(cacheKey, alerts, 300); // 5 minutes
      return alerts;
    } catch (error) {
      // Return empty array if no alerts or API error
      return [];
    }
  }

  async getHistoricalData(lat, lon, timestamp) {
    const cacheKey = `historical_${lat}_${lon}_${timestamp}`;
    const cached = getFromCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/onecall/timemachine`, {
        params: {
          lat,
          lon,
          dt: timestamp,
          appid: this.apiKey,
          units: 'metric',
          lang: 'pt_br'
        }
      });

      setInCache(cacheKey, response.data, 3600); // 1 hour
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAirPollution(lat, lon) {
    const cacheKey = `pollution_${lat}_${lon}`;
    const cached = getFromCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/air_pollution`, {
        params: {
          lat,
          lon,
          appid: this.apiKey
        }
      });

      setInCache(cacheKey, response.data, 600);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async geocodeCity(cityName) {
    const cacheKey = `geo_${cityName}`;
    const cached = getFromCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.geoUrl}/direct`, {
        params: {
          q: cityName,
          limit: 5,
          appid: this.apiKey
        }
      });

      setInCache(cacheKey, response.data, 86400); // 24 hours
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async reverseGeocode(lat, lon) {
    const cacheKey = `reverse_geo_${lat}_${lon}`;
    const cached = getFromCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.geoUrl}/reverse`, {
        params: {
          lat,
          lon,
          limit: 1,
          appid: this.apiKey
        }
      });

      setInCache(cacheKey, response.data, 86400);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message || 'OpenWeather API Error';

      const err = new Error(message);
      err.statusCode = status;
      return err;
    }

    const err = new Error('Failed to fetch weather data');
    err.statusCode = 500;
    return err;
  }
}

module.exports = new WeatherService();
