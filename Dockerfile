FROM node:14.17.1-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

CMD ["docker-compose", "pull", "docker-compose", "up", "npm", "start"]
