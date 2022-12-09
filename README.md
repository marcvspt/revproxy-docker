# reverseProxyMultiWebDocker
## Requeriments
* A domain
* Server with docker, docker-compose and Public IP address
* Set 3 subdomains: php.<your.domain>, nodejs.<your.domain>, python.<your.domain>

## Install and Deploy Web Services
First, we need to up the containers and probe the redirection with the subdomains without SSL, just **HTTP:80**
```bash
docker-compose up -d
```

## Install and Deploy SSL
Once probed the services, we can create the certifies, you must replace ```<your.domain>``` by your domain, in the routes, server_name, etc. Everything in all config files:
* [**none.conf**](nginxrevproxy/conf/none.conf)
* [**nodejs.conf**](nginxrevproxy/conf/nodejs.conf)
* [**python.conf**](nginxrevproxy/conf/python.conf)
* [**php.conf**](nginxrevproxy/conf/php.conf)
Later, run the next command, but replace ```<your.email>``` for your mail:
```bash
docker-compose run --rm certbot certonly --email <your@email> --webroot --webroot-path /var/www/certbot --dry-run -d <your.domain> -d nodejs.<your.domain> -d python.<your.domain> -d php.<your.domain> --agree-tos
```

If everything its **OK** with the certs, run the last command but, without "**--dry-run**":
```bash
docker-compose run --rm certbot certonly --email <your@email> --webroot --webroot-path /var/www/certbot -d <your.domain> -d nodejs.<your.domain> -d python.<your.domain> -d php.<your.domain> --agree-tos
```

Now, we need to stop the containers and modify the config files.
```bash
docker-compose down
```
We comment lines 12 **(location / {)** and 14 **(proxy_pass http://webnodejs:8080)**, uncomment lines 13 **(if ($host = nodejs.<your.domain>) {)** and 15 **(return 301 http://$host$request_uri)**. Also the SSL-HTTPS configuration from lines 19 to 30 in the configuration files:
* [**nodejs.conf**](nginxrevproxy/conf/nodejs.conf)
* [**python.conf**](nginxrevproxy/conf/python.conf)
* [**php.conf**](nginxrevproxy/conf/php.conf)
In the case of [**none.conf**](nginxrevproxy/conf/none.conf), which is the default SSL page, we comment lines 12 **(location / {)**, 14 **(proxy_pass  http://localhost)** and 15 **(index  index.html index.htm)**, uncomment 13 **(if ($host = <your.domain>) {)** and 16 **(return 301 http://$host$request_uri)**, as well as the SSL from lines 20 to 32.
And now, we can turn on the containers:
```bash
docker-compose up -d
```

## Renew certificates
We just need run the next command:
```bash
docker-compose run --rm certbot renew
```
