# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all server files
COPY . .

# Expose port (same as your .env or default)
EXPOSE 7860

# Start server
CMD ["node", "server.js"]