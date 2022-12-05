FROM php:8.0-apache
LABEL maintainer="Atriox Banished atriox.contacto@gmail.com"
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt-get update && apt-get upgrade -y
