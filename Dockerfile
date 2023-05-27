### STAGE 1: Build ###
FROM node:16.13.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.19.10-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/docs /usr/share/nginx/html