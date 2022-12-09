# reverseProxyMultiWebDocker

## INSTALL AND DEPLOY
docker-compose up -d

Necesitamos iniciar y probar el servicio primero, luego hacemos esta prueba con el certbot.
```bash
docker-compose run --rm certbot certonly --email atriox.contacto@gmail.com --webroot --webroot-path /var/www/certbot --dry-run -d atrioxlab.ml -d nodejs.atrioxlab.ml -d python.atrioxlab.ml -d php.atrioxlab.ml --agree-tos
```

Si todo está bien entonces quitamos "--dry-run"
```bash
docker-compose run --rm certbot certonly --email atriox.contacto@gmail.com --webroot --webroot-path /var/www/certbot -d atrioxlab.ml -d nodejs.atrioxlab.ml -d python.atrioxlab.ml -d php.atrioxlab.ml --agree-tos
```
Una vez hecho esto apagamos el docker-compose
```bash
docker-compose down
```

Comentamos las lineas 12 y 14, descomentamos las lineas 13 y 15, así como toda la parte del SSL que va desde la 19 a la 30.
En el caso de none.conf, que es la página default ssl, comentamos 12, 14 y 15, descomentamos 13 y 16, así como el SSL desde la 20 a la 32.
Otra vez prendemos y listo.
```bash
docker-compose up -d
```
