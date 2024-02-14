FROM node:21-alpine3.18 as builder

WORKDIR /src
COPY . /src

RUN npm i vite

RUN npm install
RUN vite build --mode staging

FROM nginx:1.25.3-alpine as web_server

COPY --from=builder /src/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
