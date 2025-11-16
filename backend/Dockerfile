# -----------------------
# Stage 1: Build
# -----------------------
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Use npm ci for reproducible installs
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# -----------------------
# Stage 2: Runtime
# -----------------------
FROM node:22-alpine AS runner

ENV NODE_ENV=production \
    PORT=3002

WORKDIR /usr/src/app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files and any required assets from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port and run
EXPOSE 3002

CMD ["npm", "run", "start"]
