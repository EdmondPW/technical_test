# Use the official Node.js 18.12.1 Alpine image as the base image
FROM node:22-alpine

ENV PORT=3003
# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3003

# Command to run the application
CMD ["npm","run","start:worker"]
