# Estágio de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Estágio de produção
FROM node:18-alpine AS production

WORKDIR /app

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production && npm cache clean --force

# Copiar código buildado do estágio anterior
COPY --from=builder /app/dist ./dist

# Mudar propriedade dos arquivos
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"] 