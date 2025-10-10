# Use Node.js version 20.12.2
FROM node:20.12.2-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code to the container
COPY . .

# Expose the port your backend runs on (usually 5000)
EXPOSE 5050

# Start the backend in development mode
CMD ["npm", "run", "dev"]
