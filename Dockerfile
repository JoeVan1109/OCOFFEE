# Use the official Node.js image to build the application
FROM node:14 AS build
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Use the official Node.js image to run the application
FROM node:14
WORKDIR /app

# Copy the application files from the build stage
COPY --from=build /app .

# Expose the port the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]