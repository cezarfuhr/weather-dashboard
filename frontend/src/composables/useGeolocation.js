import { ref } from 'vue'

export function useGeolocation() {
  const coords = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = new Error('Geolocalização não é suportada pelo navegador')
        error.value = err.message
        reject(err)
        return
      }

      loading.value = true

      navigator.geolocation.getCurrentPosition(
        (position) => {
          coords.value = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            accuracy: position.coords.accuracy
          }
          loading.value = false
          resolve(coords.value)
        },
        (err) => {
          error.value = err.message
          loading.value = false
          reject(err)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    })
  }

  const watchPosition = (callback) => {
    if (!navigator.geolocation) {
      error.value = 'Geolocalização não é suportada pelo navegador'
      return null
    }

    return navigator.geolocation.watchPosition(
      (position) => {
        coords.value = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy
        }
        if (callback) callback(coords.value)
      },
      (err) => {
        error.value = err.message
      }
    )
  }

  return {
    coords,
    error,
    loading,
    getCurrentPosition,
    watchPosition
  }
}
