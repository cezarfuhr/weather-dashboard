# Weather Dashboard - Frontend

Microserviço frontend para o Weather Dashboard.

## Tecnologias

- Vue.js 3
- Composition API
- Pinia
- Chart.js
- Leaflet
- Vite
- Vitest

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## Executar

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Testes
npm test
```

## Estrutura

```
src/
├── components/     # Componentes Vue
├── views/          # Páginas
├── stores/         # Pinia stores
├── services/       # API services
├── composables/    # Composables Vue
└── assets/         # Estilos e recursos
```

## Componentes Principais

- **SearchLocation** - Busca e geolocalização
- **CurrentWeather** - Clima atual
- **ForecastCard** - Previsão de 10 dias
- **WeatherMap** - Mapa interativo
- **AlertsPanel** - Alertas climáticos
- **HistoricalChart** - Gráficos históricos
