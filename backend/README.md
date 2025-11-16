# Weather Dashboard - Backend API

Microserviço backend para o Weather Dashboard.

## Tecnologias

- Node.js 18+
- Express.js
- OpenWeather API
- Node-Cache
- Jest & Supertest

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=3001
OPENWEATHER_API_KEY=your_api_key_here
```

## Executar

```bash
# Desenvolvimento
npm run dev

# Produção
npm start

# Testes
npm test
```

## Endpoints

- `GET /api/health` - Health check
- `GET /api/weather/current` - Clima atual
- `GET /api/weather/forecast` - Previsão do tempo
- `GET /api/weather/alerts` - Alertas climáticos
- `GET /api/weather/historical` - Dados históricos
- `GET /api/weather/pollution` - Qualidade do ar
- `GET /api/weather/geocode` - Buscar cidade
- `GET /api/weather/reverse-geocode` - Coordenadas para cidade
