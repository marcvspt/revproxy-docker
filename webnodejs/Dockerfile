FROM node:18.15
LABEL maintainer="Atriox Banished atriox.banished@hotmail.com"
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./app ./
CMD [ "node", "server.js" ]
