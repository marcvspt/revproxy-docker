FROM node:lts-slim
LABEL maintainer="Marcvs <marcvspt@gmail.com>"

WORKDIR /app
COPY ./app ./

RUN npm install

CMD [ "node", "server.js" ]