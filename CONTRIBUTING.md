# Contributing to Weather Dashboard

Obrigado por considerar contribuir com o Weather Dashboard! 🌤️

## Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Features](#sugerindo-features)

## Código de Conduta

Este projeto segue um Código de Conduta. Ao participar, você concorda em manter um ambiente respeitoso e acolhedor para todos.

## Como Contribuir

Existem várias maneiras de contribuir:

- 🐛 Reportar bugs
- 💡 Sugerir novas features
- 📝 Melhorar documentação
- 🔧 Corrigir bugs
- ✨ Implementar novas features
- 🧪 Adicionar testes

## Configuração do Ambiente

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Git
- Chave da API OpenWeather

### Setup Local

1. **Fork e clone o repositório**

```bash
git clone https://github.com/seu-usuario/weather-dashboard.git
cd weather-dashboard
```

2. **Configure as variáveis de ambiente**

```bash
# Backend
cp backend/.env.example backend/.env
# Edite backend/.env e adicione sua OPENWEATHER_API_KEY

# Frontend
cp frontend/.env.example frontend/.env
```

3. **Instale dependências**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

4. **Inicie o ambiente de desenvolvimento**

```bash
# Usando Docker Compose (recomendado)
docker-compose -f docker-compose.dev.yml up

# Ou manualmente
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

5. **Acesse a aplicação**

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Workflow de Desenvolvimento

### 1. Crie uma branch

```bash
git checkout -b feature/minha-feature
# ou
git checkout -b fix/meu-bugfix
```

Convenções de nomes:
- `feature/` - Novas funcionalidades
- `fix/` - Correções de bugs
- `docs/` - Alterações na documentação
- `refactor/` - Refatorações
- `test/` - Adição de testes
- `chore/` - Tarefas de manutenção

### 2. Faça suas alterações

- Escreva código limpo e bem documentado
- Adicione testes para novas funcionalidades
- Mantenha commits pequenos e focados
- Teste suas alterações localmente

### 3. Execute os testes

```bash
# Backend
cd backend
npm test
npm run lint

# Frontend
cd frontend
npm test
npm run lint
```

### 4. Commit suas alterações

```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
```

### 5. Push e crie um Pull Request

```bash
git push origin feature/minha-feature
```

Depois abra um Pull Request no GitHub.

## Padrões de Código

### JavaScript/Vue.js

- Use **ES6+** syntax
- Use **const** e **let** (nunca var)
- Use **arrow functions** quando apropriado
- Use **template literals** para strings
- Use **async/await** ao invés de callbacks
- Componentes Vue devem usar **Composition API**

### Estilo de Código

```javascript
// ✅ Bom
const getUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`)
    return response.data
  } catch (error) {
    logger.error('Failed to fetch user', { userId, error })
    throw error
  }
}

// ❌ Ruim
function getUserData(userId, callback) {
  api.get('/users/' + userId, function(err, res) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      callback(null, res.data)
    }
  })
}
```

### Formatação

- Indentação: 2 espaços
- Ponto e vírgula: obrigatório
- Aspas: simples (')
- Linha máxima: 100 caracteres (flexível)

### Nomeação

- **Variáveis**: camelCase (`userName`, `isLoading`)
- **Funções**: camelCase (`getUserData`, `fetchWeather`)
- **Componentes**: PascalCase (`UserCard`, `WeatherMap`)
- **Constantes**: UPPER_SNAKE_CASE (`API_KEY`, `MAX_RETRIES`)
- **Arquivos**: kebab-case (`user-service.js`, `weather-api.js`)

## Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração de código
- `test`: Adição de testes
- `chore`: Tarefas de manutenção

### Exemplos

```bash
feat(api): adiciona endpoint de histórico meteorológico
fix(map): corrige erro ao clicar no mapa
docs(readme): atualiza instruções de instalação
test(weather): adiciona testes para service layer
chore(deps): atualiza dependências
```

## Pull Requests

### Checklist

Antes de abrir um PR, verifique:

- [ ] Código segue os padrões do projeto
- [ ] Testes passam localmente
- [ ] Novos testes adicionados (se aplicável)
- [ ] Documentação atualizada (se aplicável)
- [ ] Commits seguem Conventional Commits
- [ ] Branch está atualizada com main
- [ ] Sem conflitos

### Template de PR

```markdown
## Descrição

Breve descrição das alterações

## Tipo de mudança

- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Como testar

1. Passo 1
2. Passo 2
3. ...

## Screenshots (se aplicável)

## Checklist

- [ ] Testes passando
- [ ] Lint passando
- [ ] Documentação atualizada
```

## Reportando Bugs

### Antes de reportar

- Verifique se o bug já foi reportado nas [Issues](https://github.com/seu-usuario/weather-dashboard/issues)
- Teste na versão mais recente
- Colete informações sobre o ambiente

### Template de Bug Report

```markdown
**Descrição**
Descrição clara do bug

**Como reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento esperado**
O que deveria acontecer

**Screenshots**
Se aplicável

**Ambiente:**
 - OS: [ex. Windows 10]
 - Navegador: [ex. Chrome 120]
 - Versão: [ex. 1.0.0]

**Informações adicionais**
Qualquer contexto adicional
```

## Sugerindo Features

### Template de Feature Request

```markdown
**A feature resolve algum problema? Descreva.**
Descrição clara do problema

**Descreva a solução que você gostaria**
Descrição clara da solução proposta

**Alternativas consideradas**
Outras soluções que você considerou

**Informações adicionais**
Contexto adicional, screenshots, etc
```

## Dúvidas?

Se tiver dúvidas, abra uma [Discussion](https://github.com/seu-usuario/weather-dashboard/discussions) ou entre em contato.

---

**Obrigado por contribuir! 🎉**
