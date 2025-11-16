import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Component:', instance)
  console.error('Error info:', info)

  // In production, you could send this to an error tracking service like Sentry
  if (import.meta.env.PROD) {
    // Sentry.captureException(err)
  }
}

// Global warning handler (development only)
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, instance, trace) => {
    console.warn('Warning:', msg)
    console.warn('Trace:', trace)
  }
}

app.use(createPinia())
app.use(router)

app.mount('#app')
