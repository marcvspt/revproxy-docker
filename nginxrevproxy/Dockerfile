FROM nginx:latest
LABEL maintainer="Atriox Banished atriox.contacto@gmail.com"
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y certbot python3-certbot-nginx
RUN sudo certbot --nginx --email atriox.contacto@gmail.com --agree-tos -d atrioxlab.ml -d nodejs.atrioxlab.ml -d python.atrioxlab.ml -d php.atrioxlab.ml
