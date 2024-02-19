FROM node:21-alpine3.18 as builder
LABEL authors="lysak.yaroslav00@yandex.ru"

RUN npm install vite -g --log-level verbose

WORKDIR /src
COPY ./package.json /src/package.json

RUN npm install --log-level verbose

COPY . /src

RUN npm run build

FROM nginx:1.25.3-alpine as web_server
LABEL authors="lysak.yaroslav00@yandex.ru"

COPY --from=builder /src/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY build/nginx/default.conf /etc/nginx/conf.d


CMD ["nginx", "-g", "daemon off;"]
