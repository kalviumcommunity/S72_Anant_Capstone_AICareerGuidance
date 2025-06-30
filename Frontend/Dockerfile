# Use official Node.js LTS image
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production environment for serving static files
FROM node:18 AS production
WORKDIR /app
COPY --from=build /app /app
RUN npm install -g serve vite
EXPOSE 4173
CMD ["vite", "preview", "--host"] 