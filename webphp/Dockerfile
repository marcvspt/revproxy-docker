FROM php:8.2-apache
LABEL maintainer="Marcvs <marcvspt@gmail.com>"

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt update -y && apt upgrade -y