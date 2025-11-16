<template>
  <div v-if="hasError" class="min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8">
      <div class="flex items-center gap-4 mb-6">
        <div class="flex-shrink-0">
          <svg class="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Algo deu errado</h1>
          <p class="text-gray-600 mt-1">Desculpe, ocorreu um erro inesperado</p>
        </div>
      </div>

      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p class="text-sm font-mono text-red-800">{{ errorMessage }}</p>
      </div>

      <div v-if="isDevelopment && errorStack" class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 overflow-auto max-h-64">
        <p class="text-xs font-mono text-gray-600 whitespace-pre-wrap">{{ errorStack }}</p>
      </div>

      <div class="flex gap-3">
        <button
          @click="reload"
          class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Recarregar Página
        </button>
        <button
          @click="goHome"
          class="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Voltar ao Início
        </button>
      </div>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          Se o problema persistir, tente limpar o cache do navegador ou
          <a href="https://github.com/seu-usuario/weather-dashboard/issues" class="text-blue-600 hover:underline">
            reportar o problema
          </a>
        </p>
      </div>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const hasError = ref(false)
const errorMessage = ref('')
const errorStack = ref('')
const isDevelopment = import.meta.env.DEV

onErrorCaptured((err, instance, info) => {
  hasError.value = true
  errorMessage.value = err.message || 'Unknown error'
  errorStack.value = err.stack || ''

  // Log to console in development
  if (isDevelopment) {
    console.error('Error boundary caught:', {
      error: err,
      instance,
      info
    })
  }

  // Prevent error from propagating
  return false
})

const reload = () => {
  window.location.reload()
}

const goHome = () => {
  hasError.value = false
  errorMessage.value = ''
  errorStack.value = ''
  router.push('/')
}
</script>
