# Use Node.js base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Remove dependencies
RUN rm -rf node_modules

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild native modules
# RUN npm rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source

# Build TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
