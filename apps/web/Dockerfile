# ==========================================
# SprintIQ Web - Build
# ==========================================

FROM node:22-alpine AS builder

WORKDIR /app

# Copy workspace manifests
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/shared-types/package*.json ./packages/shared-types/

# Install dependencies
RUN npm ci

# Copy source
COPY packages/shared-types ./packages/shared-types
COPY apps/web ./apps/web

# Build frontend
RUN npm run build --workspace=web


# ==========================================
# SprintIQ Web - Production
# ==========================================

FROM nginx:alpine AS production

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite production build
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]