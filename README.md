# Reverse-Proxy MultiWeb con Docker
## Requerimientos
* Un dominio
* Servidor con docker, docker-compose y dirección IP pública
* Configurar 4 subdominos en la zona DNS: `www.<domain>`, `php.<domain>`, `nodejs.<domain>`, `python.<domain>`

## Instalar y desplegar servicios web
Primero, necesitamos subir los contenedores y probar la redirección con los subdominios sin SSL, simplemente con **HTTP:80**
```bash
git clone https://github.com/atriox2510/RevProxy
cd RevProxy
```

Debe sustituir `<dominio>` por su dominio, en las rutas, nombre_servidor, etc., en todos los archivos de configuración:
* [**none.conf**](nginx/conf/none.conf)
* [**nodejs.conf**](nginx/conf/nodejs.conf)
* [**python.conf**](nginxconf/python.conf)
* [**php.conf**](nginx/conf/php.conf)

Levante los contenedores y espere a que inicien:
```bash
docker-compose up -d
```

## Instalar y desplegar SSL
Una vez probados los servicios, podemos crear los certificados. Ejecuta el siguiente comando, pero sustituye `<tu@email>` por tu correo:
```bash
docker-compose run --rm certbot certonly --email <your@email> --webroot --webroot-path /var/www/certbot --dry-run -d <domain> -d www.<domain> -d nodejs.<domain> -d python.<domain> -d php.<domain> --agree-tos
```

Si todo está bien con los certificados debemos obtener un mensaje que diga lo siguiente `The dry run was successful`. Ahora ejecutamos el mismo comando ya sin `--dry-run`:
```bash
docker-compose run --rm certbot certonly --email <your@email> --webroot --webroot-path /var/www/certbot -d <domain> -d www.<domain> -d nodejs.<domain> -d python.<domain> -d php.<domain> --agree-tos
```

Ahora, tenemos que detener los contenedores y modificar los archivos de configuración.
```bash
docker-compose down
```

Comentamos las líneas: 12 `location / {` y 14 `proxy_pass http://webnodejs:8080`, descomentamos las líneas: 13 `if ($host = nodejs.<domain>) {` y 15 `return 301 http://$host$request_uri`. También la configuración SSL-HTTPS de las líneas 19 to 30 en los archivos de configuración:
* [**nodejs.conf**](nginx/conf/nodejs.conf)
* [**python.conf**](nginx/conf/python.conf)
* [**php.conf**](nginx/conf/php.conf)

En el caso de [**none.conf**](nginx/conf/none.conf), que es el SSL default, comentamos las líneas: 12 `location / {`, 14 `proxy_pass  http://localhost` y 15 `index  index.html index.htm`, descomentamos las líneas: 13 `if ($host = <domain>) {` y 16 `return 301 http://$host$request_uri`. También la configuración SSL-HTTPS de las líneas 20 a 32.
Ahora, podemos levantar los contenedores:
```bash
docker-compose up -d
```

## Renovar certificados
Debemos ejecutar el siguiente comando:
```bash
docker-compose run --rm certbot renew
```
