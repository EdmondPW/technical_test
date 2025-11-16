# Use a Node.js image as the base for building
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite application for production
RUN npm run build

# Use a lightweight Nginx image to serve the static build files
FROM nginx:alpine

# Copy the built application from the builder stage to Nginx's html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]