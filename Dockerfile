FROM node:11-alpine AS builder
COPY . ./burger-app
WORKDIR /burger-app
RUN npm install
RUN npm run build:prod:en

FROM nginx:1-alpine
COPY --from=builder /burger-app/dist/ /usr/share/nginx/html
EXPOSE 80