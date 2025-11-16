<template>
  <div class="card">
    <h3 class="card-title">🗺️ Mapa de Radar</h3>
    <div
      ref="mapContainer"
      class="map-container"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useWeatherStore } from '../stores/weatherStore'

const weatherStore = useWeatherStore()
const mapContainer = ref(null)
let map = null
let marker = null
let weatherLayer = null

onMounted(() => {
  initMap()
})

watch(() => weatherStore.currentLocation, (newLocation) => {
  if (newLocation && map) {
    updateMap(newLocation.lat, newLocation.lon)
  }
}, { deep: true })

const initMap = () => {
  if (!mapContainer.value) return

  // Default center (Brazil)
  const defaultLat = -15.7801
  const defaultLon = -47.9292

  map = L.map(mapContainer.value).setView([defaultLat, defaultLon], 4)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map)

  // Add click event to map
  map.on('click', async (e) => {
    const { lat, lng } = e.latlng
    await weatherStore.setLocation(lat, lng)
  })

  // If there's already a location, update the map
  if (weatherStore.currentLocation) {
    updateMap(weatherStore.currentLocation.lat, weatherStore.currentLocation.lon)
  }
}

const updateMap = (lat, lon) => {
  if (!map) return

  // Update map view
  map.setView([lat, lon], 10)

  // Remove existing marker
  if (marker) {
    map.removeLayer(marker)
  }

  // Add new marker
  marker = L.marker([lat, lon]).addTo(map)

  const locationName = weatherStore.currentLocation?.name || 'Localização'
  const temp = weatherStore.currentWeather?.main?.temp
    ? `${Math.round(weatherStore.currentWeather.main.temp)}°C`
    : ''

  marker.bindPopup(`
    <div style="text-align: center;">
      <strong>${locationName}</strong><br/>
      ${temp}
    </div>
  `).openPopup()

  // Add weather overlay layer (precipitation, clouds, etc.)
  if (weatherLayer) {
    map.removeLayer(weatherLayer)
  }

  // Note: Requires OpenWeather API key for weather tiles
  // Uncomment to enable weather overlay
  /*
  weatherLayer = L.tileLayer(
    `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    {
      attribution: 'Weather data © OpenWeather',
      opacity: 0.6
    }
  ).addTo(map)
  */
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
