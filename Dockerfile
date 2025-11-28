# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /src

# Copy package manifests separately to leverage Docker cache when deps don’t change
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project (source, tsconfig, etc.)
COPY . .

# Build TypeScript
RUN npm run build

# --- Production stage ---
FROM node:20-alpine AS production
WORKDIR /src

# Copy only package.json + installed dependencies (production only)
COPY package*.json ./
RUN npm install --only=production

# Copy compiled output from builder
COPY --from=builder /src/dist ./dist

# If you use environment variables, optionally copy them too — ensure .env is secure if used
# COPY .env ./

# Expose the port your app listens on (adjust if different)
EXPOSE 3000

# Run the compiled server
CMD ["node", "dist/server.js"]
