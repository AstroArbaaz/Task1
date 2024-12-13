# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine as production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
EXPOSE 4000
CMD ["npm", "start"]