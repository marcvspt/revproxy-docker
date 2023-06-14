# Reverse-Proxy MultiWeb con Docker
## Requerimientos
* Un dominio
* Servidor con docker, docker-compose y dirección IP pública
* Configurar 5 subdominos en la zona DNS: `<domain>`, `www.<domain>`, `php.<domain>`, `nodejs.<domain>` y `python.<domain>`.

## Instalar y desplegar servicios web
Primero, necesitamos desplegar los contenedores y probar la redirección con los subdominios sin SSL, simplemente con **HTTP** por el puerto **80**:
```bash
git clone https://github.com/atriox2510/RevProxy
cd RevProxy
```

Debe sustituir `<dominio>` por su dominio, en las rutas, `server_name`, etc., en todos los archivos de configuración:
* [**default.conf**](revproxy/conf/default.conf)
* [**nodejs.conf**](revproxy/conf/nodejs.conf)
* [**python.conf**](revproxy/conf/python.conf)
* [**php.conf**](revproxy/conf/php.conf)

Levante los contenedores y espere a que inicien:
```bash
docker-compose up -d
```

## Instalar y desplegar SSL
Una vez probados los servicios, podemos crear los certificados. Ejecuta el siguiente comando, pero sustituye `<your@email>` por tu correo:
```bash
docker-compose run --rm certbot certonly --email <your@email> --webroot --webroot-path /var/www/certbot --dry-run -d <domain> -d www.<domain> -d nodejs.<domain> -d python.<domain> -d php.<domain> --agree-tos
```

Si todo está bien con los certificados debemos obtener un mensaje que diga lo siguiente `The dry run was successful`. Ahora ejecutamos el mismo comando ya sin `--dry-run`:
```bash
docker-compose run --rm certbot certonly --email <your@email> --webroot --webroot-path /var/www/certbot -d <domain> -d www.<domain> -d nodejs.<domain> -d python.<domain> -d php.<domain> --agree-tos
```

Ahora, tenemos que detener los contenedores y modificar los archivos de configuración:
```bash
docker-compose down
```

Comentamos la línea 11 `proxy_pass  http://<container>:<port>` y descomentamos la línea 12 `return 301 https://$server_name$request_uri;`. También descomentamos la configuración SSL-HTTPS de las líneas 16 a 33 en:
* [**nodejs.conf**](revproxy/conf/nodejs.conf)
* [**python.conf**](revproxy/conf/python.conf)
* [**php.conf**](revproxy/conf/php.conf)

En el caso de [**default.conf**](revproxy/conf/default.conf), que es el SSL default, comentamos las líneas 16 `root /var/www/html;`, 17 `try_files $uri $uri/ =404;` y descomentamos la 18 `return 301 https://$server_name$request_uri;`. También descomentamos la configuración SSL-HTTPS de las líneas 22 a 35.

Ahora, podemos levantar los contenedores:
```bash
docker-compose up -d
```

## Renovar certificados
Debemos ejecutar el siguiente comando:
```bash
docker-compose run --rm certbot renew
```