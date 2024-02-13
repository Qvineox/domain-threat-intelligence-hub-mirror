FROM node:21-alpine3.18 as builder

WORKDIR /src
COPY . /src

RUN npm install
RUN npm run build

FROM nginx:3.25.2-alpine as web_server

COPY --from=builder /src/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
