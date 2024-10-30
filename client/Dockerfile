# Stage 1: Build the Vite app
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and npm.lock to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

RUN ls -la /app/dist

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output from the previous stage to Nginx's directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx.conf if needed
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]