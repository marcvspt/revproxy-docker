# reverseProxyMultiWebDocker

## INSTALL AND DEPLOY
docker-compose up -d
docker-compose run --rm certbot certonly --email atriox.contacto@gmail.com --webroot --webroot-path /var/www/certbot/ --dry-run -d atrioxlab.ml -d nodejs.atrioxlab.ml -d python.atrioxlab.ml -d php.atrioxlab.ml --agree-tos
