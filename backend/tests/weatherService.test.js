const weatherService = require('../src/services/weatherService');
const axios = require('axios');

jest.mock('axios');
jest.mock('../src/utils/cache', () => ({
  getFromCache: jest.fn(),
  setInCache: jest.fn()
}));

const { getFromCache, setInCache } = require('../src/utils/cache');

describe('WeatherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentWeather', () => {
    it('should return cached data when available', async () => {
      const mockData = { temp: 25, weather: 'sunny' };
      getFromCache.mockReturnValue(mockData);

      const result = await weatherService.getCurrentWeather(40.7128, -74.0060);

      expect(result).toEqual(mockData);
      expect(getFromCache).toHaveBeenCalledWith('current_40.7128_-74.006');
      expect(axios.get).not.toHaveBeenCalled();
    });

    it('should fetch and cache data when not in cache', async () => {
      const mockData = { temp: 25, weather: 'sunny' };
      getFromCache.mockReturnValue(null);
      axios.get.mockResolvedValue({ data: mockData });

      const result = await weatherService.getCurrentWeather(40.7128, -74.0060);

      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalled();
      expect(setInCache).toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
      getFromCache.mockReturnValue(null);
      axios.get.mockRejectedValue({
        response: {
          status: 401,
          data: { message: 'Invalid API key' }
        }
      });

      await expect(
        weatherService.getCurrentWeather(40.7128, -74.0060)
      ).rejects.toThrow('Invalid API key');
    });
  });

  describe('getForecast', () => {
    it('should return forecast data', async () => {
      const mockData = { list: [{ temp: 25 }, { temp: 26 }] };
      getFromCache.mockReturnValue(null);
      axios.get.mockResolvedValue({ data: mockData });

      const result = await weatherService.getForecast(40.7128, -74.0060, 10);

      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalled();
    });

    it('should use fallback on primary API failure', async () => {
      const mockData = { list: [] };
      getFromCache.mockReturnValue(null);

      axios.get
        .mockRejectedValueOnce(new Error('Primary API failed'))
        .mockResolvedValueOnce({ data: mockData });

      const result = await weatherService.getForecast(40.7128, -74.0060, 10);

      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });

  describe('geocodeCity', () => {
    it('should return geocoding data for a city', async () => {
      const mockData = [{ lat: 40.7128, lon: -74.0060, name: 'New York' }];
      getFromCache.mockReturnValue(null);
      axios.get.mockResolvedValue({ data: mockData });

      const result = await weatherService.geocodeCity('New York');

      expect(result).toEqual(mockData);
      expect(setInCache).toHaveBeenCalled();
    });
  });

  describe('getWeatherAlerts', () => {
    it('should return empty array on error', async () => {
      getFromCache.mockReturnValue(null);
      axios.get.mockRejectedValue(new Error('API error'));

      const result = await weatherService.getWeatherAlerts(40.7128, -74.0060);

      expect(result).toEqual([]);
    });
  });
});
