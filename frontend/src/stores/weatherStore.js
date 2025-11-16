import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { weatherApi } from '../services/weatherApi'

export const useWeatherStore = defineStore('weather', () => {
  // State
  const currentWeather = ref(null)
  const forecast = ref(null)
  const alerts = ref([])
  const historicalData = ref([])
  const airPollution = ref(null)
  const currentLocation = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const hasAlerts = computed(() => alerts.value.length > 0)
  const temperature = computed(() => currentWeather.value?.main?.temp || null)
  const weatherDescription = computed(() =>
    currentWeather.value?.weather?.[0]?.description || ''
  )

  // Actions
  async function fetchCurrentWeather(lat, lon) {
    loading.value = true
    error.value = null
    try {
      const response = await weatherApi.getCurrentWeather(lat, lon)
      currentWeather.value = response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchForecast(lat, lon, days = 10) {
    loading.value = true
    error.value = null
    try {
      const response = await weatherApi.getForecast(lat, lon, days)
      forecast.value = response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchAlerts(lat, lon) {
    try {
      const response = await weatherApi.getAlerts(lat, lon)
      alerts.value = response.data
    } catch (err) {
      console.error('Error fetching alerts:', err)
      alerts.value = []
    }
  }

  async function fetchHistoricalData(lat, lon, daysBack = 7) {
    loading.value = true
    error.value = null
    try {
      const promises = []
      const now = Math.floor(Date.now() / 1000)
      const oneDay = 86400

      for (let i = 1; i <= daysBack; i++) {
        const timestamp = now - (oneDay * i)
        promises.push(weatherApi.getHistoricalData(lat, lon, timestamp))
      }

      const results = await Promise.all(promises)
      historicalData.value = results.map(r => r.data)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchAirPollution(lat, lon) {
    try {
      const response = await weatherApi.getAirPollution(lat, lon)
      airPollution.value = response.data
    } catch (err) {
      console.error('Error fetching air pollution:', err)
    }
  }

  async function searchCity(cityName) {
    loading.value = true
    error.value = null
    try {
      const response = await weatherApi.geocodeCity(cityName)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function setLocation(lat, lon) {
    currentLocation.value = { lat, lon }

    await Promise.all([
      fetchCurrentWeather(lat, lon),
      fetchForecast(lat, lon),
      fetchAlerts(lat, lon),
      fetchAirPollution(lat, lon)
    ])

    try {
      const response = await weatherApi.reverseGeocode(lat, lon)
      if (response.data?.[0]) {
        currentLocation.value.name = response.data[0].name
        currentLocation.value.country = response.data[0].country
      }
    } catch (err) {
      console.error('Error reverse geocoding:', err)
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    currentWeather,
    forecast,
    alerts,
    historicalData,
    airPollution,
    currentLocation,
    loading,
    error,
    // Getters
    hasAlerts,
    temperature,
    weatherDescription,
    // Actions
    fetchCurrentWeather,
    fetchForecast,
    fetchAlerts,
    fetchHistoricalData,
    fetchAirPollution,
    searchCity,
    setLocation,
    clearError
  }
})
