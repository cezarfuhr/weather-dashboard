import api from './api'

export const weatherApi = {
  // Get current weather
  async getCurrentWeather(lat, lon) {
    return api.get('/weather/current', {
      params: { lat, lon }
    })
  },

  // Get forecast
  async getForecast(lat, lon, days = 10) {
    return api.get('/weather/forecast', {
      params: { lat, lon, days }
    })
  },

  // Get weather alerts
  async getAlerts(lat, lon) {
    return api.get('/weather/alerts', {
      params: { lat, lon }
    })
  },

  // Get historical data
  async getHistoricalData(lat, lon, timestamp) {
    return api.get('/weather/historical', {
      params: { lat, lon, timestamp }
    })
  },

  // Get air pollution data
  async getAirPollution(lat, lon) {
    return api.get('/weather/pollution', {
      params: { lat, lon }
    })
  },

  // Geocode city
  async geocodeCity(city) {
    return api.get('/weather/geocode', {
      params: { city }
    })
  },

  // Reverse geocode
  async reverseGeocode(lat, lon) {
    return api.get('/weather/reverse-geocode', {
      params: { lat, lon }
    })
  }
}
