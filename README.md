# OVS API 🚀

API desenvolvida com NestJS e PostgreSQL, configurada para rodar em containers Docker.

## 🎯 Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando
- [Git](https://git-scm.com/) (para clonar o repositório)

## 🚀 Como rodar o projeto (SUPER FÁCIL!)

### 1. Clone o repositório
```bash
git clone -b docker-configs https://github.com/abreujay/ovsapi.git
cd ovsapi
```

### 2. Verifique se o Docker está funcionando
```bash
docker --version
docker-compose --version
```

### 3. Rode o projeto (UM COMANDO SÓ!)
```bash
docker-compose up --build
```

### 4. Acesse a aplicação
- **API**: http://localhost:3000
- **Banco de dados**: localhost:5432

## 📁 Estrutura do projeto

```
ovsapi/
├── src/
│   ├── app.module.ts          # Configuração principal
│   ├── users/                 # Módulo de usuários
│   └── main.ts               # Ponto de entrada
├── docker-compose.yml         # Configuração dos containers
├── Dockerfile                 # Configuração da imagem da API
└── package.json              # Dependências do projeto
```

## 🛠️ Serviços

- **API (NestJS)**: Porta 3000
- **PostgreSQL**: Porta 5432
  - Usuário: postgres
  - Senha: postgres
  - Banco: postgres

## 💡 Comandos úteis

```bash
# Rodar em background
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar os serviços
docker-compose down

# Parar e remover volumes (cuidado: apaga dados do banco)
docker-compose down -v

# Rebuild apenas um serviço
docker-compose up --build api
```

## 🔧 Troubleshooting

### Docker não está funcionando
1. Verifique se o Docker Desktop está rodando
2. Reinicie o Docker Desktop
3. Reinicie o computador se necessário

### Erro de conexão com banco
1. Aguarde o PostgreSQL inicializar completamente
2. Verifique se as portas não estão sendo usadas por outros serviços

### Erro de build
1. Limpe o cache: `docker system prune -a`
2. Rebuild: `docker-compose up --build`

## 🛠️ Desenvolvimento

Para desenvolvimento local sem Docker:

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run start:dev

# Build para produção
npm run build
```

## 🌍 Variáveis de ambiente

As seguintes variáveis são configuradas no docker-compose.yml:
- `DATABASE_HOST=postgres`
- `DATABASE_PORT=5432`
- `DATABASE_USER=postgres`
- `DATABASE_PASSWORD=postgres`
- `DATABASE_NAME=postgres`

## 🎉 Pronto!

Agora você tem uma API completa rodando em containers Docker! 

**Para compartilhar com amigos**: Eles só precisam ter Docker Desktop e rodar os 3 comandos acima! 🚀
