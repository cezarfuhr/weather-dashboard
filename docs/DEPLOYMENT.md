# Deployment Guide

Guia completo para deploy do Weather Dashboard em produção.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Deploy com Docker](#deploy-com-docker)
- [Deploy em Cloud Providers](#deploy-em-cloud-providers)
- [Configuração de HTTPS](#configuração-de-https)
- [Monitoramento](#monitoramento)
- [Troubleshooting](#troubleshooting)

## Pré-requisitos

### Requisitos Mínimos

- **Servidor**: 1 CPU, 1GB RAM (mínimo para testes)
- **Servidor Recomendado**: 2 CPUs, 2GB RAM
- **Armazenamento**: 10GB
- **Sistema Operacional**: Linux (Ubuntu 22.04 LTS recomendado)
- **Docker**: 24.0+
- **Docker Compose**: 2.20+

### Dependências Externas

- **OpenWeather API Key**: [Obter aqui](https://openweathermap.org/api)
- **Domínio** (opcional mas recomendado)
- **Certificado SSL** (Let's Encrypt recomendado)

## Variáveis de Ambiente

### Backend (`backend/.env.production`)

```bash
# Servidor
NODE_ENV=production
PORT=3001

# OpenWeather API
OPENWEATHER_API_KEY=sua_chave_aqui
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
OPENWEATHER_GEO_URL=https://api.openweathermap.org/geo/1.0

# Cache
CACHE_TTL=600

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=https://seu-dominio.com

# Logging (opcional)
LOG_LEVEL=info
```

### Frontend (`frontend/.env.production`)

```bash
VITE_API_BASE_URL=https://seu-dominio.com/api
VITE_APP_TITLE=Weather Dashboard
```

## Deploy com Docker

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/weather-dashboard.git
cd weather-dashboard
```

### 2. Configure Variáveis de Ambiente

```bash
# Backend
cp backend/.env.example backend/.env.production
nano backend/.env.production  # Edite com suas configurações

# Frontend
cp frontend/.env.example frontend/.env.production
nano frontend/.env.production
```

### 3. Build e Start

```bash
# Build das imagens
docker-compose build

# Start dos containers
docker-compose up -d

# Verifique os logs
docker-compose logs -f
```

### 4. Verificação

```bash
# Health check do backend
curl http://localhost:3001/api/health

# Acesse o frontend
curl http://localhost
```

## Deploy em Cloud Providers

### AWS (EC2 + Docker)

1. **Lance uma instância EC2**
   - AMI: Ubuntu 22.04 LTS
   - Tipo: t3.small ou superior
   - Storage: 20GB SSD
   - Security Group: Portas 80, 443, 22

2. **Conecte via SSH**

```bash
ssh -i sua-chave.pem ubuntu@seu-ip-publico
```

3. **Instale Docker**

```bash
# Atualize o sistema
sudo apt update && sudo apt upgrade -y

# Instale Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Adicione usuário ao grupo docker
sudo usermod -aG docker $USER

# Instale Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

4. **Deploy da aplicação** (siga passos do Docker acima)

### DigitalOcean (Droplet)

1. **Crie um Droplet**
   - Imagem: Docker on Ubuntu
   - Tamanho: Basic 2GB RAM
   - Região: Mais próxima dos usuários

2. **Configure DNS**
   - Aponte seu domínio para o IP do droplet
   - Configure registros A e AAAA

3. **Deploy** (siga passos do Docker)

### Google Cloud Platform (Compute Engine)

1. **Crie uma VM**

```bash
gcloud compute instances create weather-dashboard \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --machine-type=e2-small \
  --boot-disk-size=20GB
```

2. **Configure Firewall**

```bash
gcloud compute firewall-rules create allow-http \
  --allow tcp:80 \
  --target-tags=http-server

gcloud compute firewall-rules create allow-https \
  --allow tcp:443 \
  --target-tags=https-server
```

3. **SSH e Deploy**

```bash
gcloud compute ssh weather-dashboard
# Siga passos de instalação do Docker
```

## Configuração de HTTPS

### Opção 1: Nginx Reverse Proxy + Let's Encrypt

1. **Instale Certbot**

```bash
sudo apt install certbot python3-certbot-nginx -y
```

2. **Obtenha certificado SSL**

```bash
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```

3. **Configure auto-renovação**

```bash
sudo certbot renew --dry-run
```

4. **Atualize docker-compose.yml**

```yaml
services:
  frontend:
    ports:
      - "443:443"
      - "80:80"
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt:ro
```

5. **Atualize nginx.conf**

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com;

    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # ... resto da configuração
}
```

### Opção 2: Cloudflare (Simples)

1. Adicione seu site ao Cloudflare
2. Configure DNS para apontar para seu servidor
3. Ative SSL/TLS no modo "Full (strict)"
4. Cloudflare gerencia o certificado automaticamente

## Monitoramento

### Logs

```bash
# Ver logs em tempo real
docker-compose logs -f

# Ver logs apenas do backend
docker-compose logs -f backend

# Ver logs apenas do frontend
docker-compose logs -f frontend

# Últimas 100 linhas
docker-compose logs --tail=100
```

### Health Checks

```bash
# Script de monitoramento simples
#!/bin/bash
BACKEND_URL="http://localhost:3001/api/health"

if curl -f $BACKEND_URL > /dev/null 2>&1; then
    echo "✓ Backend healthy"
else
    echo "✗ Backend down - restarting..."
    docker-compose restart backend
fi
```

Adicione ao crontab para executar a cada 5 minutos:

```bash
crontab -e
*/5 * * * * /path/to/health-check.sh >> /var/log/health-check.log 2>&1
```

### Métricas com Docker Stats

```bash
# Monitoramento em tempo real
docker stats

# Usar ctop para interface melhor
docker run --rm -it \
  --name=ctop \
  --volume /var/run/docker.sock:/var/run/docker.sock:ro \
  quay.io/vektorlab/ctop:latest
```

## Backup

### Backup de Configurações

```bash
#!/bin/bash
BACKUP_DIR="/backup/weather-dashboard"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup de .env files
tar -czf $BACKUP_DIR/env-$DATE.tar.gz \
  backend/.env.production \
  frontend/.env.production

# Backup de configurações
tar -czf $BACKUP_DIR/configs-$DATE.tar.gz \
  docker-compose.yml \
  frontend/nginx.conf

echo "Backup criado: $BACKUP_DIR"
```

## Rollback

Se algo der errado, faça rollback:

```bash
# Pare os containers
docker-compose down

# Volte para versão anterior
git checkout <commit-anterior>

# Rebuild e restart
docker-compose build
docker-compose up -d
```

## Troubleshooting

### Container não inicia

```bash
# Verifique logs
docker-compose logs backend

# Verifique variáveis de ambiente
docker-compose config

# Reinicie container específico
docker-compose restart backend
```

### Erro de API Key

```bash
# Verifique se a variável está definida
docker-compose exec backend env | grep OPENWEATHER

# Se não estiver, reconfigure
docker-compose down
# Edite backend/.env.production
docker-compose up -d
```

### Performance lenta

```bash
# Verifique uso de recursos
docker stats

# Aumente recursos no docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G

# Aumente cache TTL
# Em backend/.env.production
CACHE_TTL=1800  # 30 minutos
```

### Problemas de HTTPS

```bash
# Verifique certificado
openssl s_client -connect seu-dominio.com:443 -showcerts

# Renove certificado Let's Encrypt
sudo certbot renew

# Verifique configuração nginx
docker-compose exec frontend nginx -t
```

## Atualizações

### Atualização Segura

```bash
# 1. Backup
./backup.sh

# 2. Pull nova versão
git pull origin main

# 3. Rebuild
docker-compose build

# 4. Stop antigo
docker-compose down

# 5. Start novo
docker-compose up -d

# 6. Verifique logs
docker-compose logs -f

# 7. Health check
curl http://localhost:3001/api/health
```

## Segurança em Produção

### Checklist de Segurança

- [ ] HTTPS configurado
- [ ] HSTS habilitado
- [ ] API keys em variáveis de ambiente
- [ ] Rate limiting ativo
- [ ] CORS configurado corretamente
- [ ] Logs sendo monitorados
- [ ] Backups regulares configurados
- [ ] Firewall configurado
- [ ] SSH com chave (não senha)
- [ ] Sistema atualizado
- [ ] Docker atualizado

### Hardening

```bash
# Desabilite root login via SSH
sudo nano /etc/ssh/sshd_config
# PermitRootLogin no

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Configure fail2ban
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## Suporte

Se encontrar problemas:
1. Verifique a seção [Troubleshooting](#troubleshooting)
2. Consulte os logs
3. Abra uma [issue](https://github.com/seu-usuario/weather-dashboard/issues)

**Happy deploying! 🚀**
