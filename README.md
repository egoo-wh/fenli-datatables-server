# fenli-datatables-server
fenli-tables的服务端。基于node和mongodb。

### mongodb
使用mongodb。
- 运行mongodb。
创建data/db文件夹。
#### dev
`mongod --dbpath=./data/db --port 27017`
#### prod
`mongod -f ./mongod.conf`
*如果出现`ERROR: child process failed, exited with error number 1`错误，是[因为/var/log/mongod.log没有权限](https://stackoverflow.com/questions/28591101/starting-mongod-fork-error-child-process-failed-exited-with-error-number-1)，加上sudo即可解决。*
- 初始化数据库
运行`mongo localhost:27017/fenli db_init.js`。*数据库名为fenli*。

## 部署
### node
npm build
### pm2
`pm2 start pm2.conf.json --env production`
~export NODE_ENV=production && node index.js~
### nginx
```
upstream fenli_upsteam {
  server 127.0.0.1:3333;
  keepalive 64;
}

server {
  listen 80;
  server_name 192.168.1.11;
  access_log /var/log/nginx/fenliApp.log;

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

## npm
npm start

`npm run watch`。watch，开发阶段使用，会监听文件更改，刷新app。

npm build。发布时使用，将代码编译为es5。
