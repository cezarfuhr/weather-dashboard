<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
    <header class="bg-white/10 backdrop-blur-md shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <h1 class="text-3xl font-bold text-white flex items-center gap-2">
          <span class="text-4xl">🌤️</span>
          Weather Dashboard
        </h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-6">
      <router-view />
    </main>

    <footer class="bg-white/10 backdrop-blur-md mt-12 py-4">
      <div class="container mx-auto px-4 text-center text-white/80 text-sm">
        <p>Weather Dashboard © 2024 - Dados fornecidos por OpenWeather API</p>
      </div>
    </footer>

    <!-- PWA Update Notification -->
    <PWAUpdatePrompt />
  </div>
</template>

<script setup>
import PWAUpdatePrompt from '@/components/PWAUpdatePrompt.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
