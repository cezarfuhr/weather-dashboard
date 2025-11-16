import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'robots.txt'],

      manifest: {
        name: 'Weather Dashboard - Previsão do Tempo',
        short_name: 'Weather',
        description: 'Dashboard completo de previsão do tempo com dados em tempo real, alertas meteorológicos e mapas interativos',
        theme_color: '#3B82F6',
        background_color: '#1E40AF',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        categories: ['weather', 'utilities', 'productivity'],
        lang: 'pt-BR',
        shortcuts: [
          {
            name: 'Clima Atual',
            short_name: 'Atual',
            description: 'Ver clima atual da sua localização',
            url: '/?view=current',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          },
          {
            name: 'Previsão 10 Dias',
            short_name: 'Previsão',
            description: 'Ver previsão estendida',
            url: '/?view=forecast',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

        // Cache de runtime para API e recursos externos
        runtimeCaching: [
          {
            // Cache de API do weather dashboard
            urlPattern: /^https?:\/\/.*\/api\/weather\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'weather-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 10 // 10 minutos
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              networkTimeoutSeconds: 10
            }
          },
          {
            // Cache de tiles do mapa (OpenStreetMap)
            urlPattern: /^https:\/\/.*\.tile\.openstreetmap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osm-tiles-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 dias
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cache de assets do Leaflet
            urlPattern: /^https:\/\/unpkg\.com\/leaflet.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'leaflet-assets-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cache de ícones do OpenWeather
            urlPattern: /^https:\/\/openweathermap\.org\/img\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'weather-icons-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 dias
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cache de imagens e fontes locais
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
              }
            }
          }
        ],

        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },

      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://backend:3001',
        changeOrigin: true
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
})
