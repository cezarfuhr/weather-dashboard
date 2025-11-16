<template>
  <div class="dashboard">
    <!-- Search Location -->
    <SearchLocation />

    <!-- Error Display -->
    <div v-if="error" class="alert alert-danger mb-6">
      {{ error }}
      <button
        @click="clearError"
        style="float: right; background: none; border: none; cursor: pointer; font-weight: bold;"
      >
        ✕
      </button>
    </div>

    <!-- Alerts Panel -->
    <div class="mb-6">
      <AlertsPanel />
    </div>

    <!-- Main Dashboard Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Current Weather -->
      <div>
        <CurrentWeather />
      </div>

      <!-- Forecast -->
      <div class="lg:col-span-2">
        <ForecastCard />
      </div>

      <!-- Weather Map -->
      <div class="md:col-span-2">
        <WeatherMap />
      </div>

      <!-- Historical Chart -->
      <div>
        <HistoricalChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'
import SearchLocation from '../components/SearchLocation.vue'
import CurrentWeather from '../components/CurrentWeather.vue'
import ForecastCard from '../components/ForecastCard.vue'
import WeatherMap from '../components/WeatherMap.vue'
import AlertsPanel from '../components/AlertsPanel.vue'
import HistoricalChart from '../components/HistoricalChart.vue'
import { useGeolocation } from '../composables/useGeolocation'

const weatherStore = useWeatherStore()
const { getCurrentPosition } = useGeolocation()

const error = computed(() => weatherStore.error)

const clearError = () => {
  weatherStore.clearError()
}

// Auto-load user's location on mount
onMounted(async () => {
  try {
    const position = await getCurrentPosition()
    await weatherStore.setLocation(position.lat, position.lon)
  } catch (err) {
    console.log('Could not get geolocation, user can search manually')
  }
})
</script>

<style scoped>
.dashboard {
  width: 100%;
}

@media (min-width: 768px) {
  .md\:col-span-2 {
    grid-column: span 2 / span 2;
  }
}

@media (min-width: 1024px) {
  .lg\:col-span-2 {
    grid-column: span 2 / span 2;
  }
}
</style>
