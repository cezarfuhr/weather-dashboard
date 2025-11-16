<template>
  <Transition name="slide-up">
    <div
      v-if="showPrompt"
      class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-2xl p-4 z-50 border border-blue-500"
    >
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 mt-1">
          <svg class="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>

        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-lg mb-1">Nova versão disponível!</h3>
          <p class="text-sm text-blue-100 mb-3">
            Uma atualização do Weather Dashboard está pronta. Atualize agora para obter os recursos mais recentes.
          </p>

          <div class="flex gap-2">
            <button
              @click="updateApp"
              class="px-4 py-2 bg-white text-blue-700 rounded-md font-medium text-sm hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
            >
              Atualizar agora
            </button>
            <button
              @click="dismiss"
              class="px-4 py-2 bg-blue-800/50 text-white rounded-md font-medium text-sm hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
            >
              Mais tarde
            </button>
          </div>
        </div>

        <button
          @click="dismiss"
          class="flex-shrink-0 text-blue-200 hover:text-white transition-colors focus:outline-none"
          aria-label="Fechar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Progress bar during update -->
      <div v-if="isUpdating" class="mt-3">
        <div class="w-full bg-blue-800 rounded-full h-1.5 overflow-hidden">
          <div class="bg-white h-full rounded-full animate-pulse" style="width: 100%"></div>
        </div>
        <p class="text-xs text-blue-100 mt-1">Atualizando...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const showPrompt = ref(false)
const isUpdating = ref(false)

const {
  offlineReady,
  needRefresh,
  updateServiceWorker
} = useRegisterSW({
  immediate: true,
  onRegisteredSW(swScriptUrl, registration) {
    console.log('✅ Service Worker registrado:', swScriptUrl)

    // Verificar atualizações a cada 60 segundos
    if (registration) {
      setInterval(() => {
        registration.update()
      }, 60 * 1000)
    }
  },
  onRegisterError(error) {
    console.error('❌ Erro ao registrar Service Worker:', error)
  }
})

// Mostrar prompt quando houver atualização
const checkForUpdates = () => {
  if (needRefresh.value) {
    showPrompt.value = true
  }

  if (offlineReady.value) {
    console.log('✅ App pronto para funcionar offline!')
  }
}

const updateApp = async () => {
  isUpdating.value = true

  try {
    await updateServiceWorker(true)
    // O app será recarregado automaticamente
  } catch (error) {
    console.error('Erro ao atualizar:', error)
    isUpdating.value = false
  }
}

const dismiss = () => {
  showPrompt.value = false
}

onMounted(() => {
  checkForUpdates()

  // Reagir a mudanças no estado de atualização
  const unwatchNeedRefresh = () => {
    if (needRefresh.value) {
      showPrompt.value = true
    }
  }

  // Executar verificação inicial
  unwatchNeedRefresh()
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
