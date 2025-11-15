<template>
  <div class="card">
    <h3 class="card-title">📈 Análise Histórica (7 dias)</h3>

    <div v-if="loading" class="text-center py-8">
      <div class="loading"></div>
      <p style="margin-top: 1rem; color: #6b7280;">Carregando dados históricos...</p>
    </div>

    <div v-else-if="hasData">
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div class="text-center">
          <div style="color: #6b7280; font-size: 0.875rem;">Temp. Média</div>
          <div style="font-size: 1.25rem; font-weight: 600;">
            {{ stats.avgTemp }}°C
          </div>
        </div>
        <div class="text-center">
          <div style="color: #6b7280; font-size: 0.875rem;">Temp. Máx</div>
          <div style="font-size: 1.25rem; font-weight: 600; color: #ef4444;">
            {{ stats.maxTemp }}°C
          </div>
        </div>
        <div class="text-center">
          <div style="color: #6b7280; font-size: 0.875rem;">Temp. Mín</div>
          <div style="font-size: 1.25rem; font-weight: 600; color: #3b82f6;">
            {{ stats.minTemp }}°C
          </div>
        </div>
        <div class="text-center">
          <div style="color: #6b7280; font-size: 0.875rem;">Umidade Média</div>
          <div style="font-size: 1.25rem; font-weight: 600;">
            {{ stats.avgHumidity }}%
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8" style="color: #6b7280;">
      <button
        v-if="currentLocation"
        class="btn btn-primary"
        @click="loadHistoricalData"
      >
        Carregar Dados Históricos
      </button>
      <p v-else>Selecione uma localização para ver dados históricos</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'
import { useChart, createTemperatureChartConfig } from '../composables/useChart'

const weatherStore = useWeatherStore()
const chartCanvas = ref(null)
const { createChart, updateChart } = useChart(chartCanvas)

const loading = computed(() => weatherStore.loading)
const historicalData = computed(() => weatherStore.historicalData)
const currentLocation = computed(() => weatherStore.currentLocation)
const hasData = computed(() => historicalData.value.length > 0)

const stats = computed(() => {
  if (!hasData.value) return { avgTemp: 0, maxTemp: 0, minTemp: 0, avgHumidity: 0 }

  const temps = historicalData.value.map(d => d.current?.temp || d.hourly?.[0]?.temp || 0)
  const humidities = historicalData.value.map(d => d.current?.humidity || d.hourly?.[0]?.humidity || 0)

  return {
    avgTemp: Math.round(temps.reduce((a, b) => a + b, 0) / temps.length),
    maxTemp: Math.round(Math.max(...temps)),
    minTemp: Math.round(Math.min(...temps)),
    avgHumidity: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length)
  }
})

const chartData = computed(() => {
  if (!hasData.value) return { labels: [], temperatures: [] }

  const labels = []
  const temperatures = []

  historicalData.value.reverse().forEach(day => {
    const date = new Date((day.current?.dt || day.dt) * 1000)
    labels.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }))
    temperatures.push(Math.round(day.current?.temp || day.hourly?.[0]?.temp || 0))
  })

  return { labels, temperatures }
})

watch(chartData, (newData) => {
  if (newData.labels.length > 0 && chartCanvas.value) {
    const config = createTemperatureChartConfig(newData.labels, newData.temperatures)
    createChart(config)
  }
}, { deep: true })

watch(currentLocation, () => {
  // Auto-load historical data when location changes
  if (currentLocation.value && !hasData.value) {
    loadHistoricalData()
  }
})

const loadHistoricalData = async () => {
  if (!currentLocation.value) return

  try {
    await weatherStore.fetchHistoricalData(
      currentLocation.value.lat,
      currentLocation.value.lon,
      7
    )
  } catch (err) {
    console.error('Error loading historical data:', err)
  }
}

onMounted(() => {
  if (currentLocation.value && !hasData.value) {
    loadHistoricalData()
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}

@media (min-width: 768px) {
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
