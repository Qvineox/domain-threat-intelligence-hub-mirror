FROM artifactory.rgs.ru:5000/docker/node:21-alpine3.18 as builder
LABEL authors="lysak.yaroslav00@yandex.ru"

WORKDIR /src
COPY . /src

RUN npm config set proxy 'http://proxy-h.rgs.ru:3128'
RUN npm config set https-proxy 'http://proxy-h.rgs.ru:3128'
RUN npm config set strict-ssl false

RUN npm install vite -g
RUN npm install

RUN npm run build

FROM artifactory.rgs.ru:5000/docker/nginx:1.25.3-alpine as web_server
LABEL authors="lysak.yaroslav00@yandex.ru"

COPY --from=builder /src/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY build/nginx/default.conf /etc/nginx/conf.d


CMD ["nginx", "-g", "daemon off;"]
