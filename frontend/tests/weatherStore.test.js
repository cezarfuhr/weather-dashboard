import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWeatherStore } from '../src/stores/weatherStore'
import { weatherApi } from '../src/services/weatherApi'

vi.mock('../src/services/weatherApi')

describe('Weather Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const store = useWeatherStore()

    expect(store.currentWeather).toBeNull()
    expect(store.forecast).toBeNull()
    expect(store.alerts).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should fetch current weather successfully', async () => {
    const mockData = {
      data: {
        main: { temp: 25 },
        weather: [{ description: 'sunny' }]
      }
    }

    weatherApi.getCurrentWeather.mockResolvedValue(mockData)

    const store = useWeatherStore()
    await store.fetchCurrentWeather(40.7128, -74.0060)

    expect(store.currentWeather).toEqual(mockData.data)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should handle errors when fetching weather', async () => {
    weatherApi.getCurrentWeather.mockRejectedValue(new Error('API Error'))

    const store = useWeatherStore()

    await expect(
      store.fetchCurrentWeather(40.7128, -74.0060)
    ).rejects.toThrow('API Error')

    expect(store.error).toBe('API Error')
    expect(store.loading).toBe(false)
  })

  it('should fetch forecast successfully', async () => {
    const mockData = {
      data: {
        list: [{ temp: 25 }, { temp: 26 }]
      }
    }

    weatherApi.getForecast.mockResolvedValue(mockData)

    const store = useWeatherStore()
    await store.fetchForecast(40.7128, -74.0060, 10)

    expect(store.forecast).toEqual(mockData.data)
  })

  it('should search for cities', async () => {
    const mockData = {
      data: [
        { name: 'São Paulo', lat: -23.5505, lon: -46.6333, country: 'BR' }
      ]
    }

    weatherApi.geocodeCity.mockResolvedValue(mockData)

    const store = useWeatherStore()
    const results = await store.searchCity('São Paulo')

    expect(results).toEqual(mockData.data)
  })

  it('should set location and fetch all weather data', async () => {
    const mockWeather = { data: { main: { temp: 25 } } }
    const mockForecast = { data: { list: [] } }
    const mockAlerts = { data: [] }
    const mockPollution = { data: {} }
    const mockGeocode = { data: [{ name: 'Test City', country: 'BR' }] }

    weatherApi.getCurrentWeather.mockResolvedValue(mockWeather)
    weatherApi.getForecast.mockResolvedValue(mockForecast)
    weatherApi.getAlerts.mockResolvedValue(mockAlerts)
    weatherApi.getAirPollution.mockResolvedValue(mockPollution)
    weatherApi.reverseGeocode.mockResolvedValue(mockGeocode)

    const store = useWeatherStore()
    await store.setLocation(-23.5505, -46.6333)

    expect(store.currentLocation).toEqual({
      lat: -23.5505,
      lon: -46.6333,
      name: 'Test City',
      country: 'BR'
    })
    expect(weatherApi.getCurrentWeather).toHaveBeenCalled()
    expect(weatherApi.getForecast).toHaveBeenCalled()
  })

  it('should compute hasAlerts correctly', () => {
    const store = useWeatherStore()

    expect(store.hasAlerts).toBe(false)

    store.alerts = [{ event: 'Storm warning' }]

    expect(store.hasAlerts).toBe(true)
  })

  it('should clear error', () => {
    const store = useWeatherStore()
    store.error = 'Test error'

    store.clearError()

    expect(store.error).toBeNull()
  })
})
