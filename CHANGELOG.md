# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added
- Input validation com Joi para todas as rotas da API
- Logging estruturado com Winston
- Error boundaries no Vue para melhor tratamento de erros
- GitHub Actions CI/CD pipeline
- Documentação de deployment (DEPLOYMENT.md)
- Guia de contribuição (CONTRIBUTING.md)
- Variáveis de ambiente para produção (.env.production.example)
- Validação de variáveis de ambiente no startup
- Headers de segurança aprimorados (HSTS, noSniff, xssFilter)
- Global error handler no Vue
- CHANGELOG.md

### Changed
- Melhorado error handling com logging detalhado
- Atualizado README com badges e informações de status
- Melhorado CSP (Content Security Policy) headers

### Security
- Adicionado HSTS headers
- Implementado validação robusta de inputs
- Melhorado error handling para prevenir vazamento de informações

## [1.0.0] - 2024-11-15

### Added
- Progressive Web App (PWA) completo
  - Instalável em dispositivos móveis e desktop
  - Funcionalidade offline com Service Worker
  - Cache inteligente (API, mapas, assets)
  - Notificações de atualização automáticas
  - Ícones PWA em múltiplos tamanhos
  - Web App Manifest completo

- Funcionalidades Meteorológicas
  - Previsão do tempo de 10 dias
  - Clima atual em tempo real
  - Alertas climáticos severos
  - Dados históricos (7 dias)
  - Qualidade do ar (AQI)
  - Mapas interativos com Leaflet
  - Geolocalização automática
  - Busca de cidades worldwide

- Infraestrutura
  - Arquitetura de microserviços
  - Backend Node.js/Express
  - Frontend Vue.js 3
  - Docker e Docker Compose
  - Cache em memória (Node-Cache)
  - Rate limiting
  - Compressão Gzip
  - CORS configurável

- Segurança
  - Helmet.js para headers seguros
  - Content Security Policy (CSP)
  - Rate limiting (100 req/15min)
  - CORS configurado
  - Sem secrets hardcoded

- Testes
  - Testes unitários backend (Jest)
  - Testes unitários frontend (Vitest)
  - Testes de integração
  - Coverage reporting

- Documentação
  - README completo
  - Instruções de instalação
  - Exemplos de API
  - Guia PWA

### Technical Stack
- Backend: Node.js 18+, Express.js, Axios, Node-Cache, Helmet
- Frontend: Vue.js 3, Pinia, Chart.js, Leaflet, Vite
- PWA: vite-plugin-pwa, Workbox
- Testing: Jest, Vitest, Supertest
- DevOps: Docker, Docker Compose, Nginx

## [0.1.0] - 2024-11-14

### Added
- Configuração inicial do projeto
- Estrutura de microserviços
- Dockerfiles para backend e frontend
- Configuração básica do Docker Compose
- Setup inicial do Vue.js e Express

---

## Tipos de Mudanças

- `Added` - Novas funcionalidades
- `Changed` - Mudanças em funcionalidades existentes
- `Deprecated` - Funcionalidades que serão removidas
- `Removed` - Funcionalidades removidas
- `Fixed` - Correções de bugs
- `Security` - Correções de segurança
