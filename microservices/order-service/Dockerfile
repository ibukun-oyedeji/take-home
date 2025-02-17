# Use official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json first (optimize caching)
COPY package.json ./

# Ensure npm is up-to-date, clean cache, and install express explicitly
RUN npm install -g npm@latest && npm cache clean --force \
    && npm install && npm install express

# Copy the rest of the application files
COPY . .

# Expose the service port
EXPOSE 8080

# Start the service
CMD ["node", "index.js"]
