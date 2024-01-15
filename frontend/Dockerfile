FROM node:20-alpine

RUN apk add --update build-base bash bash-completion npm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001
