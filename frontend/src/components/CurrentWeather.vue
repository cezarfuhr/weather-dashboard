<template>
  <div class="card">
    <div v-if="loading" class="text-center py-8">
      <div class="loading" style="width: 40px; height: 40px; border-width: 4px;"></div>
      <p style="margin-top: 1rem; color: #6b7280;">Carregando dados...</p>
    </div>

    <div v-else-if="currentWeather">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="card-title" style="margin-bottom: 0.25rem;">
            {{ locationName }}
          </h2>
          <p style="color: #6b7280;">{{ formattedDate }}</p>
        </div>
        <div class="text-4xl">{{ weatherIcon }}</div>
      </div>

      <div class="text-center mb-6">
        <div style="font-size: 4rem; font-weight: 700; color: #1f2937;">
          {{ Math.round(currentWeather.main.temp) }}°C
        </div>
        <div style="font-size: 1.25rem; color: #6b7280; text-transform: capitalize;">
          {{ currentWeather.weather[0].description }}
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="text-center">
          <div style="color: #6b7280; font-size: 0.875rem;">Sensação</div>
          <div style="font-size: 1.25rem; font-weight: 600;">
            {{ Math.round(currentWeather.main.feels_like) }}°C
          </div>
        </div>
        <div class="text-center">
          <div style="color: #6b7280; font-size: 0.875rem;">Umidade</div>
          <div style="font-size: 1.25rem; font-weight: 600;">
            {{ currentWeather.main.humidity }}%
          </div>
        </div>
        <div class="text-center">
          <div style="color: #6b7280; font-size: 0.875rem;">Vento</div>
          <div style="font-size: 1.25rem; font-weight: 600;">
            {{ Math.round(currentWeather.wind.speed * 3.6) }} km/h
          </div>
        </div>
        <div class="text-center">
          <div style="color: #6b7280; font-size: 0.875rem;">Pressão</div>
          <div style="font-size: 1.25rem; font-weight: 600;">
            {{ currentWeather.main.pressure }} hPa
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8" style="color: #6b7280;">
      Selecione uma localização para ver o clima atual
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'

const weatherStore = useWeatherStore()

const currentWeather = computed(() => weatherStore.currentWeather)
const loading = computed(() => weatherStore.loading)

const locationName = computed(() => {
  if (weatherStore.currentLocation?.name) {
    return `${weatherStore.currentLocation.name}, ${weatherStore.currentLocation.country || ''}`
  }
  return currentWeather.value?.name || 'Localização'
})

const formattedDate = computed(() => {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const weatherIcon = computed(() => {
  if (!currentWeather.value) return '🌤️'

  const weatherId = currentWeather.value.weather[0].id

  // Weather icon mapping based on OpenWeather condition codes
  if (weatherId >= 200 && weatherId < 300) return '⛈️' // Thunderstorm
  if (weatherId >= 300 && weatherId < 400) return '🌦️' // Drizzle
  if (weatherId >= 500 && weatherId < 600) return '🌧️' // Rain
  if (weatherId >= 600 && weatherId < 700) return '❄️' // Snow
  if (weatherId >= 700 && weatherId < 800) return '🌫️' // Atmosphere
  if (weatherId === 800) return '☀️' // Clear
  if (weatherId > 800) return '☁️' // Clouds

  return '🌤️'
})
</script>
