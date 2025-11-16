const request = require('supertest');

// Mock environment variables before requiring the app
process.env.NODE_ENV = 'test';
process.env.OPENWEATHER_API_KEY = 'test_api_key';
process.env.PORT = '3002';

const app = require('../src/server');

describe('API Integration Tests', () => {
  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Weather Dashboard');
      expect(response.body.endpoints).toBeDefined();
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/weather/* - Error Handling', () => {
    it('should return 400 for missing parameters', async () => {
      const response = await request(app).get('/api/weather/current');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app).get('/api/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Rate Limiting', () => {
    it('should apply rate limiting', async () => {
      // This test would need proper configuration
      // and might be skipped in quick test runs
      const response = await request(app).get('/api/health');
      expect(response.headers['ratelimit-limit']).toBeDefined();
    });
  });
});
