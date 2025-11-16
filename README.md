# 🌤️ Weather Dashboard

<div align="center">

**Dashboard completo de previsão do tempo com PWA, dados em tempo real, mapas interativos e análise histórica**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Vue](https://img.shields.io/badge/vue-3.3.4-4FC08D?logo=vue.js)](https://vuejs.org/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=github-actions)](https://github.com/features/actions)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Demo](#) • [Documentação](docs/DEPLOYMENT.md) • [Contribuir](CONTRIBUTING.md) • [Reportar Bug](https://github.com/seu-usuario/weather-dashboard/issues)

![Weather Dashboard Screenshot](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Weather+Dashboard+Screenshot)

</div>

---

## ✨ Highlights

<table>
<tr>
<td width="50%">

### 🎯 Características Principais
- ✅ **Arquitetura de Microserviços** com Docker
- ✅ **PWA Completo** - Funciona offline
- ✅ **Input Validation** com Joi
- ✅ **Logging Estruturado** com Winston
- ✅ **Error Boundaries** no Vue 3
- ✅ **CI/CD** com GitHub Actions
- ✅ **Security Headers** (CSP, HSTS, XSS Protection)
- ✅ **Rate Limiting** e Cache inteligente

</td>
<td width="50%">

### 📊 Stack Tecnológico
- 🎨 **Frontend**: Vue 3, Pinia, Vite, Tailwind CSS
- ⚙️ **Backend**: Node.js, Express, Winston, Joi
- 📦 **DevOps**: Docker, Docker Compose, GitHub Actions
- 🗺️ **Mapas**: Leaflet, OpenStreetMap
- 📈 **Gráficos**: Chart.js
- 🔒 **Segurança**: Helmet, CORS, Rate Limiting

</td>
</tr>
</table>

## 📋 Recursos

### Funcionalidades Meteorológicas
- 🌤️ **Previsão de 10 dias** - Visualize a previsão detalhada do tempo
- 🗺️ **Mapas de radar** - Mapas interativos com Leaflet
- ⚠️ **Alertas climáticos** - Notificações em tempo real de eventos meteorológicos
- 📈 **Gráficos históricos** - Análise de dados dos últimos 7 dias
- 📍 **Geolocalização** - Detecção automática da sua localização
- 🔍 **Busca de cidades** - Pesquise o clima de qualquer lugar do mundo
- 💨 **Qualidade do ar** - Informações sobre poluição atmosférica

### 📱 Progressive Web App (PWA)
- ⚡ **Instalável** - Instale no seu dispositivo móvel ou desktop
- 🔄 **Offline First** - Funciona mesmo sem conexão à internet
- 🚀 **Cache Inteligente** - Carregamento instantâneo com cache otimizado
- 🔔 **Atualizações Automáticas** - Notificações de novas versões
- 📦 **Cache de API** - Dados meteorológicos salvos localmente (10 min)
- 🗺️ **Cache de Mapas** - Tiles do OpenStreetMap armazenados (30 dias)
- 🎨 **Ícones Adaptativos** - Suporte completo para iOS e Android

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
- **Vite PWA Plugin** - Progressive Web App
- **Workbox** - Service Worker e cache strategies

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

## 📱 Instalando como PWA

O Weather Dashboard é uma **Progressive Web App (PWA)** completa que pode ser instalada em qualquer dispositivo!

### 📲 No Celular (Android/iOS)

1. **Abra o app no navegador** (Chrome, Safari, Edge)
2. **Toque no menu** (⋮ ou compartilhar)
3. **Selecione "Adicionar à Tela Inicial"** ou "Instalar aplicativo"
4. **Pronto!** O app agora está na sua tela inicial 🎉

### 💻 No Desktop (Chrome, Edge)

1. **Acesse** http://localhost (ou seu domínio)
2. **Clique no ícone de instalação** na barra de endereço (➕)
3. **Ou** vá em Menu → Instalar Weather Dashboard
4. **O app abrirá em janela própria!**

### 🔌 Funcionalidades Offline

Mesmo sem internet, você pode:
- ✅ Visualizar dados meteorológicos em cache (até 10 minutos)
- ✅ Navegar pelo mapa com tiles armazenados
- ✅ Ver previsões e gráficos salvos
- ✅ Interface totalmente funcional

### 🔄 Cache Strategy

| Recurso | Estratégia | TTL |
|---------|------------|-----|
| API Weather | Network First | 10 min |
| Tiles do Mapa | Cache First | 30 dias |
| Assets (JS/CSS) | Cache First | 1 ano |
| Ícones Weather | Cache First | 30 dias |
| Leaflet CDN | Cache First | 1 ano |

### 🔔 Atualizações

O app verifica atualizações automaticamente a cada 60 segundos. Quando houver uma nova versão:
1. Uma notificação aparecerá no canto inferior
2. Clique em "**Atualizar agora**" para aplicar
3. O app será recarregado com a nova versão

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

Este projeto implementa múltiplas camadas de segurança:

### Headers de Segurança
- ✅ **Content Security Policy (CSP)** - Previne XSS
- ✅ **HSTS** - Força HTTPS
- ✅ **X-Content-Type-Options** - Previne MIME sniffing
- ✅ **X-Frame-Options** - Previne clickjacking
- ✅ **X-XSS-Protection** - Proteção adicional contra XSS

### Validação e Limitação
- ✅ **Joi Validation** - Validação robusta de inputs
- ✅ **Rate Limiting** - 100 requests/15min por IP
- ✅ **CORS Configurável** - Controle de origens
- ✅ **Environment Validation** - Validação de env vars no startup

### Logging e Monitoramento
- ✅ **Winston** - Logging estruturado em JSON
- ✅ **Error Tracking** - Logs detalhados de erros
- ✅ **Request Logging** - Rastreamento de requisições

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
## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [Guia de Contribuição](CONTRIBUTING.md) antes de enviar pull requests.

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

Veja o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes completos.

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Nome](https://linkedin.com/in/seu-perfil)
- Portfolio: [seuportfolio.com](https://seuportfolio.com)

## 🙏 Agradecimentos

- [OpenWeather](https://openweathermap.org/) - API de dados meteorológicos
- [OpenStreetMap](https://www.openstreetmap.org/) - Mapas e tiles
- [Leaflet](https://leafletjs.com/) - Biblioteca de mapas interativos
- [Vue.js](https://vuejs.org/) - Framework frontend
- [Express](https://expressjs.com/) - Framework backend

---

<div align="center">

**Feito com ❤️ e ☕**

Se este projeto foi útil, considere dar uma ⭐!

</div>
