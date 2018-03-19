FROM node:8.10
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3333
CMD [ "npm", "run", "prod" ]