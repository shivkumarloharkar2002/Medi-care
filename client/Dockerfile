# Use Node.js version 20.12.2 for the frontend development server
FROM node:20.12.2-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the frontend folder
COPY package*.json ./

# Install frontend dependencies
RUN npm install -g npm@10.8.3

# Copy the rest of the frontend code to the container
COPY . .

# Expose port 3000 (React development server)
EXPOSE 3000

# Start the frontend development server
CMD ["npm", "start"]
