# ==========================================
# SprintIQ API - Production Image
# ==========================================

FROM node:22-alpine AS builder

WORKDIR /app

# Copy workspace manifests
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/shared-types/package*.json ./packages/shared-types/

# Install dependencies
RUN npm ci

# Copy source
COPY packages/shared-types ./packages/shared-types
COPY apps/api ./apps/api

# Build API
RUN npm run build --workspace=api


# ==========================================
# Production Image
# ==========================================

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy package manifests
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/shared-types/package*.json ./packages/shared-types/

# Install production dependencies
RUN npm ci --omit=dev

# Copy compiled API
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Copy shared package if required at runtime
COPY --from=builder /app/packages/shared-types ./packages/shared-types

EXPOSE 3000

CMD ["node", "apps/api/dist/index.js"]