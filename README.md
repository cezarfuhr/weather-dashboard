# 🌤️ Weather Dashboard

Dashboard completo de previsão do tempo com dados em tempo real, mapas interativos e análise histórica.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Vue](https://img.shields.io/badge/vue-3.3.4-brightgreen.svg)

## 📋 Recursos

- 🌤️ **Previsão de 10 dias** - Visualize a previsão detalhada do tempo
- 🗺️ **Mapas de radar** - Mapas interativos com Leaflet
- ⚠️ **Alertas climáticos** - Notificações em tempo real de eventos meteorológicos
- 📈 **Gráficos históricos** - Análise de dados dos últimos 7 dias
- 📍 **Geolocalização** - Detecção automática da sua localização
- 🔍 **Busca de cidades** - Pesquise o clima de qualquer lugar do mundo
- 💨 **Qualidade do ar** - Informações sobre poluição atmosférica

## 🏗️ Arquitetura

Este projeto utiliza arquitetura de **microserviços** com Docker Compose:

```
weather-dashboard/
├── backend/          # Microserviço Node.js/Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── utils/
│   ├── tests/
│   └── Dockerfile
├── frontend/         # Microserviço Vue.js 3
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── services/
│   │   ├── stores/
│   │   └── composables/
│   ├── tests/
│   └── Dockerfile
└── docker-compose.yml
```

## 🛠️ Tech Stack

### Backend
- **Node.js** 18+ - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **Axios** - Cliente HTTP
- **Node-Cache** - Cache em memória
- **Helmet** - Segurança HTTP
- **Express Rate Limit** - Limitação de taxa
- **Jest** & **Supertest** - Testes

### Frontend
- **Vue.js 3** - Framework progressivo
- **Composition API** - API moderna do Vue
- **Pinia** - Gerenciamento de estado
- **Chart.js** - Gráficos interativos
- **Leaflet** - Mapas interativos
- **Axios** - Cliente HTTP
- **Vite** - Build tool
- **Vitest** - Framework de testes

### API Externa
- **OpenWeather API** - Dados meteorológicos em tempo real

## 🚀 Instalação e Uso

### Pré-requisitos

- Docker & Docker Compose
- Chave da API OpenWeather ([obter aqui](https://openweathermap.org/api))

### Opção 1: Docker Compose (Recomendado)

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/weather-dashboard.git
cd weather-dashboard
```

2. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env e adicione sua chave da API OpenWeather
```

3. **Inicie os containers**
```bash
# Produção
docker-compose up -d

# Desenvolvimento
docker-compose -f docker-compose.dev.yml up
```

4. **Acesse a aplicação**
- Frontend: http://localhost
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/api/health

### Opção 2: Instalação Local

#### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure o .env com sua API key
npm start
```

#### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 🧪 Executando Testes

### Backend
```bash
cd backend
npm test
npm run test:watch
```

### Frontend
```bash
cd frontend
npm test
npm run test:watch
```

## 📡 API Endpoints

### Backend API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/weather/current?lat={lat}&lon={lon}` | Clima atual |
| GET | `/api/weather/forecast?lat={lat}&lon={lon}&days={days}` | Previsão do tempo |
| GET | `/api/weather/alerts?lat={lat}&lon={lon}` | Alertas climáticos |
| GET | `/api/weather/historical?lat={lat}&lon={lon}&timestamp={ts}` | Dados históricos |
| GET | `/api/weather/pollution?lat={lat}&lon={lon}` | Qualidade do ar |
| GET | `/api/weather/geocode?city={city}` | Geocodificação |
| GET | `/api/weather/reverse-geocode?lat={lat}&lon={lon}` | Geocodificação reversa |

### Exemplo de Requisição

```bash
# Obter clima atual para São Paulo
curl "http://localhost:3001/api/weather/current?lat=-23.5505&lon=-46.6333"

# Obter previsão de 10 dias
curl "http://localhost:3001/api/weather/forecast?lat=-23.5505&lon=-46.6333&days=10"
```

### Exemplo de Resposta

```json
{
  "success": true,
  "data": {
    "main": {
      "temp": 25.5,
      "feels_like": 26.2,
      "humidity": 65,
      "pressure": 1013
    },
    "weather": [
      {
        "description": "céu limpo",
        "icon": "01d"
      }
    ],
    "wind": {
      "speed": 4.5
    }
  }
}
```

## 🔒 Segurança

- **Helmet.js** - Headers HTTP seguros
- **Rate Limiting** - Proteção contra abuso
- **CORS** - Configuração de origens permitidas
- **Validação de entrada** - Validação de parâmetros
- **Cache** - Cache inteligente para reduzir chamadas à API

## ⚡ Performance

- **Cache em memória** - TTL de 10 minutos para dados meteorológicos
- **Compression** - Compressão gzip para respostas
- **Lazy loading** - Carregamento sob demanda de dados históricos
- **Build otimizado** - Bundle minificado e tree-shaking

## 🎨 Componentes Vue

### Principais Componentes

- **SearchLocation** - Busca e geolocalização
- **CurrentWeather** - Clima atual
- **ForecastCard** - Previsão de 10 dias
- **WeatherMap** - Mapa interativo com Leaflet
- **AlertsPanel** - Alertas climáticos
- **HistoricalChart** - Gráficos históricos com Chart.js

### Composables

- **useGeolocation** - Hook de geolocalização
- **useChart** - Hook para Chart.js

### Stores (Pinia)

- **weatherStore** - Gerenciamento centralizado de estado

## 📊 Cobertura de Testes

O projeto inclui testes abrangentes para:

- ✅ Serviços de API
- ✅ Controllers
- ✅ Stores Pinia
- ✅ Componentes Vue
- ✅ Composables
- ✅ Integração E2E

## 🌍 Variáveis de Ambiente

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
OPENWEATHER_API_KEY=your_api_key_here
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
OPENWEATHER_GEO_URL=https://api.openweathermap.org/geo/1.0
CACHE_TTL=600
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE=Weather Dashboard
```

## 🐳 Docker

### Comandos Úteis

```bash
# Build e iniciar containers
docker-compose up --build

# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f

# Executar em background
docker-compose up -d

# Rebuild de um serviço específico
docker-compose build backend
docker-compose build frontend

# Acessar shell do container
docker-compose exec backend sh
docker-compose exec frontend sh
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 🙏 Agradecimentos

- [OpenWeather](https://openweathermap.org/) - API de dados meteorológicos
- [Leaflet](https://leafletjs.com/) - Biblioteca de mapas
- [Chart.js](https://www.chartjs.org/) - Biblioteca de gráficos
- [Vue.js](https://vuejs.org/) - Framework JavaScript

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ usando Vue.js e Node.js**