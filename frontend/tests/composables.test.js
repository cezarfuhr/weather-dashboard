import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useGeolocation } from '../src/composables/useGeolocation'

describe('useGeolocation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const { coords, error, loading } = useGeolocation()

    expect(coords.value).toBeNull()
    expect(error.value).toBeNull()
    expect(loading.value).toBe(false)
  })

  it('should handle successful geolocation', async () => {
    const mockGeolocation = {
      getCurrentPosition: vi.fn((success) => {
        success({
          coords: {
            latitude: 40.7128,
            longitude: -74.0060,
            accuracy: 10
          }
        })
      })
    }

    global.navigator.geolocation = mockGeolocation

    const { coords, getCurrentPosition } = useGeolocation()

    await getCurrentPosition()

    expect(coords.value).toEqual({
      lat: 40.7128,
      lon: -74.0060,
      accuracy: 10
    })
  })

  it('should handle geolocation error', async () => {
    const mockGeolocation = {
      getCurrentPosition: vi.fn((success, error) => {
        error(new Error('Permission denied'))
      })
    }

    global.navigator.geolocation = mockGeolocation

    const { error: geoError, getCurrentPosition } = useGeolocation()

    await expect(getCurrentPosition()).rejects.toThrow()
    expect(geoError.value).toBeDefined()
  })

  it('should handle missing geolocation API', async () => {
    global.navigator.geolocation = undefined

    const { error, getCurrentPosition } = useGeolocation()

    await expect(getCurrentPosition()).rejects.toThrow()
    expect(error.value).toContain('não é suportada')
  })
})
