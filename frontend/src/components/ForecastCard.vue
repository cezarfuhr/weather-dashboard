<template>
  <div class="card">
    <h3 class="card-title">📅 Previsão de 10 Dias</h3>

    <div v-if="loading" class="text-center py-4">
      <div class="loading"></div>
    </div>

    <div v-else-if="forecastList.length > 0" class="grid gap-3">
      <div
        v-for="(day, index) in forecastList"
        :key="index"
        class="forecast-item"
      >
        <div class="flex justify-between items-center">
          <div style="flex: 1;">
            <div style="font-weight: 600;">{{ day.date }}</div>
            <div style="color: #6b7280; font-size: 0.875rem; text-transform: capitalize;">
              {{ day.description }}
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="text-2xl">{{ day.icon }}</div>
            <div class="text-center">
              <div style="font-weight: 600; color: #ef4444;">
                {{ day.tempMax }}°
              </div>
              <div style="color: #6b7280;">
                {{ day.tempMin }}°
              </div>
            </div>
            <div class="text-center" style="min-width: 60px;">
              <div style="font-size: 0.75rem; color: #6b7280;">💧</div>
              <div style="font-size: 0.875rem;">{{ day.humidity }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-4" style="color: #6b7280;">
      Nenhuma previsão disponível
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'

const weatherStore = useWeatherStore()

const forecast = computed(() => weatherStore.forecast)
const loading = computed(() => weatherStore.loading)

const forecastList = computed(() => {
  if (!forecast.value?.list) return []

  // Process forecast data
  return forecast.value.list.slice(0, 10).map((item) => {
    const date = new Date(item.dt * 1000)
    const weatherId = item.weather[0].id

    return {
      date: date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }),
      description: item.weather[0].description,
      icon: getWeatherIcon(weatherId),
      tempMax: Math.round(item.temp?.max || item.main?.temp_max || item.temp || 0),
      tempMin: Math.round(item.temp?.min || item.main?.temp_min || item.temp || 0),
      humidity: item.humidity || item.main?.humidity || 0
    }
  })
})

const getWeatherIcon = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) return '⛈️'
  if (weatherId >= 300 && weatherId < 400) return '🌦️'
  if (weatherId >= 500 && weatherId < 600) return '🌧️'
  if (weatherId >= 600 && weatherId < 700) return '❄️'
  if (weatherId >= 700 && weatherId < 800) return '🌫️'
  if (weatherId === 800) return '☀️'
  if (weatherId > 800) return '☁️'
  return '🌤️'
}
</script>

<style scoped>
.forecast-item {
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  transition: background-color 0.2s;
}

.forecast-item:hover {
  background-color: #f3f4f6;
}
</style>
