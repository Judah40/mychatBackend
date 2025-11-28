# Use Node LTS as base image
FROM node:latest

# Set working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build TypeScript
RUN npm run build

# Expose port (adjust if needed)
EXPOSE 3000

# Start the app
CMD ["node", "dist/server.js"]
