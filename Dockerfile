# Use a base image with Node.js pre-installed
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm ci --only=production

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which your Node.js application listens
EXPOSE 3001

# Set the command to start the Node.js application
CMD ["node", "index.js"]

