<template>
  <div v-if="hasAlerts" class="card">
    <h3 class="card-title">⚠️ Alertas Climáticos</h3>

    <div class="grid gap-3">
      <div
        v-for="(alert, index) in alerts"
        :key="index"
        :class="getAlertClass(alert)"
      >
        <div style="font-weight: 600; margin-bottom: 0.5rem;">
          {{ alert.event || 'Alerta Climático' }}
        </div>
        <div style="font-size: 0.875rem; margin-bottom: 0.5rem;">
          {{ alert.description || alert.headline || 'Descrição não disponível' }}
        </div>
        <div style="font-size: 0.75rem; color: #6b7280;">
          Início: {{ formatDate(alert.start) }}
          <span v-if="alert.end"> - Fim: {{ formatDate(alert.end) }}</span>
        </div>
        <div v-if="alert.sender_name" style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
          Fonte: {{ alert.sender_name }}
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="!loading" class="card">
    <div class="flex items-center gap-3">
      <div class="text-3xl">✅</div>
      <div>
        <div style="font-weight: 600; color: #059669;">Nenhum Alerta Ativo</div>
        <div style="color: #6b7280; font-size: 0.875rem;">
          Não há alertas climáticos para sua região no momento
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'

const weatherStore = useWeatherStore()

const alerts = computed(() => weatherStore.alerts)
const hasAlerts = computed(() => weatherStore.hasAlerts)
const loading = computed(() => weatherStore.loading)

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  return new Date(timestamp * 1000).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getAlertClass = (alert) => {
  const severity = alert.severity || alert.event || ''
  const severityLower = severity.toLowerCase()

  if (severityLower.includes('extreme') || severityLower.includes('severe')) {
    return 'alert alert-danger'
  }

  return 'alert alert-warning'
}
</script>
