# Use official Node.js image (LTS version 20)
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json first (for caching optimization)
COPY package.json ./

# Install dependencies with a compatible npm version
RUN npm install -g npm@10 && npm cache clean --force && npm install && npm install express

# Copy the rest of the application files
COPY . .

# Verify if express is installed
RUN ls -la && ls -la node_modules && npm list express || echo "❌ Express is NOT installed!"

# Expose the service port
EXPOSE 8080

# Start the service
CMD ["node", "index.js"]
