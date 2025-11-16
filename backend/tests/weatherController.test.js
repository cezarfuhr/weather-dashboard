const request = require('supertest');
const express = require('express');
const weatherController = require('../src/controllers/weatherController');
const weatherService = require('../src/services/weatherService');

jest.mock('../src/services/weatherService');

const app = express();
app.use(express.json());
app.get('/current', weatherController.getCurrentWeather);
app.get('/forecast', weatherController.getForecast);
app.get('/alerts', weatherController.getAlerts);

describe('WeatherController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /current', () => {
    it('should return current weather data', async () => {
      const mockData = { temp: 25, weather: 'sunny' };
      weatherService.getCurrentWeather.mockResolvedValue(mockData);

      const response = await request(app)
        .get('/current')
        .query({ lat: 40.7128, lon: -74.0060 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockData);
    });

    it('should return 400 if lat or lon is missing', async () => {
      const response = await request(app).get('/current');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('required');
    });
  });

  describe('GET /forecast', () => {
    it('should return forecast data', async () => {
      const mockData = { list: [{ temp: 25 }] };
      weatherService.getForecast.mockResolvedValue(mockData);

      const response = await request(app)
        .get('/forecast')
        .query({ lat: 40.7128, lon: -74.0060, days: 10 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockData);
    });

    it('should use default days value', async () => {
      const mockData = { list: [] };
      weatherService.getForecast.mockResolvedValue(mockData);

      await request(app)
        .get('/forecast')
        .query({ lat: 40.7128, lon: -74.0060 });

      expect(weatherService.getForecast).toHaveBeenCalledWith(40.7128, -74.006, 10);
    });
  });

  describe('GET /alerts', () => {
    it('should return weather alerts', async () => {
      const mockData = [{ event: 'Storm warning' }];
      weatherService.getWeatherAlerts.mockResolvedValue(mockData);

      const response = await request(app)
        .get('/alerts')
        .query({ lat: 40.7128, lon: -74.0060 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockData);
    });
  });
});
