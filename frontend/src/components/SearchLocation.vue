<template>
  <div class="card mb-6">
    <div class="flex gap-4 items-center">
      <div class="flex-1">
        <input
          v-model="searchQuery"
          type="text"
          class="input"
          placeholder="Buscar cidade... (ex: São Paulo, Rio de Janeiro)"
          @keyup.enter="handleSearch"
        />
      </div>
      <button
        class="btn btn-primary"
        @click="handleSearch"
        :disabled="loading || !searchQuery.trim()"
      >
        <span v-if="loading" class="loading"></span>
        <span v-else>🔍 Buscar</span>
      </button>
      <button
        class="btn btn-primary"
        @click="useCurrentLocation"
        :disabled="geoLoading"
      >
        <span v-if="geoLoading" class="loading"></span>
        <span v-else>📍 Minha Localização</span>
      </button>
    </div>

    <div v-if="searchResults.length > 0" class="mt-4">
      <div class="card-title">Resultados da Busca</div>
      <div class="grid gap-2">
        <button
          v-for="(location, index) in searchResults"
          :key="index"
          class="card hover:bg-gray-50 cursor-pointer text-left"
          @click="selectLocation(location)"
          style="padding: 0.75rem;"
        >
          <div class="font-bold">{{ location.name }}, {{ location.country }}</div>
          <div class="text-sm" style="color: #6b7280;">
            {{ location.state || '' }} ({{ location.lat.toFixed(4) }}, {{ location.lon.toFixed(4) }})
          </div>
        </button>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'
import { useGeolocation } from '../composables/useGeolocation'

const weatherStore = useWeatherStore()
const { getCurrentPosition } = useGeolocation()

const searchQuery = ref('')
const searchResults = ref([])
const loading = ref(false)
const geoLoading = ref(false)
const error = ref(null)

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return

  loading.value = true
  error.value = null

  try {
    const results = await weatherStore.searchCity(searchQuery.value)
    searchResults.value = results

    if (results.length === 0) {
      error.value = 'Nenhuma cidade encontrada'
    }
  } catch (err) {
    error.value = 'Erro ao buscar cidade'
  } finally {
    loading.value = false
  }
}

const selectLocation = async (location) => {
  searchResults.value = []
  searchQuery.value = ''
  await weatherStore.setLocation(location.lat, location.lon)
}

const useCurrentLocation = async () => {
  geoLoading.value = true
  error.value = null

  try {
    const position = await getCurrentPosition()
    await weatherStore.setLocation(position.lat, position.lon)
  } catch (err) {
    error.value = 'Erro ao obter localização: ' + err.message
  } finally {
    geoLoading.value = false
  }
}
</script>

<style scoped>
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.flex-1 {
  flex: 1;
}
</style>
