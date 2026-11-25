# ── Stage 1: Build the React frontend ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (cache-friendly layer)
COPY package*.json ./
RUN npm ci --include=dev

# Copy source and build
COPY . .
RUN npm run build


# ── Stage 2: Production image ───────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Copy server source
COPY server ./server

# Create uploads directory (persisted via Docker volume)
RUN mkdir -p server/uploads

# Expose the Express port
EXPOSE 5000

# Health check: Express API should respond within 10 s after startup
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT:-5000}/api/site || exit 1

CMD ["node", "server/index.js"]
