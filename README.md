# fenli-datatables-server
fenli-tables的服务端。基于node、[mongodb](http://mongodb.com)和[docker](https://www.docker.com/)。

## 部署
### 安装docker
- [安装docker](https://yq.aliyun.com/articles/110806?spm=5176.8351553.0.0.6a72199157yatM)
- 配置docker加速镜像
修改 `/etc/docker/daemon.json` 文件并添加上 registry-mirrors 键值
```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

### 使用docker进行部署
下列2种方式均可，推荐docker-compose。
#### docker-compose方式
- `docker-compose up -d`
- `docker exec fenli-db bash -c 'mongo /data/conf/db_init.js'`

#### “原始”方式
##### image for the database(mongo)
```
docker run -it --rm --name fenli-db --volume "$PWD/data/db":/data/db --volume "$PWD/conf":/data/conf -d mongo:3.6.3

docker exec fenli-db bash -c 'mongo /data/conf/db_init.js'

```
##### image for the application(node)
```
docker image build -t fenli-server-app .

docker run --rm -p 3333:3333 -it --link fenli-db:mongo --name fenli-app -d fenli-server-app
```

## 连接mongo应使用`mongodb://fenli-db/fenli`而不是`mongodb://localhost:27017/fenli`.[详解](https://stackoverflow.com/questions/41861908/cant-connect-to-docker-mongodb)

### nginx
```
upstream fenli_upsteam {
  server 127.0.0.1:3333;
  keepalive 64;
}

server {
  listen 80;
  server_name 192.168.1.11;
  access_log /var/log/nginx/fenli.api.log;

  location /fenli_server/ {
    rewrite ^/fenli_server/(.*)$ /$1 break;

    proxy_pass http://fenli_upsteam;
    proxy_read_timeout 240s;
    proxy_redirect off;
    #proxy_redirect http://fenli_server/ /fenli_server;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-NginX-Proxy true;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### mongodb
数据库名为fenli
./conf/db_init.js 					数据库初始化脚本，包含初始化数据。

### npm
默认端口为3333
`npm start`。node index.js

`npm run watch`。开发阶段使用，会监听文件更改，刷新app。

`npm build`。发布时使用，将代码编译至build目录，当NODE_ENV为production时会使用build目录文件。

`npm prod`。= `export NODE_ENV=production && node index.js`

### 开发阶段
- `mongod --dbpath=./data/db --port 27017`。开启mongo服务。
- `npm run watch`。运行node app.


CLIENT

```
docker pull registry.docker-cn.com/library/nginx:1.13.9
run -d -p 127.0.0.1:6680:80 --rm --name mynginx --volume "$PWD/html":/usr/share/nginx/html  registry.docker-cn.com/library/nginx:1.13.9
```