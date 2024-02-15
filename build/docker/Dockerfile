FROM node:21-alpine3.18 as builder
LABEL authors="lysak.yaroslav00@yandex.ru"

WORKDIR /src
COPY . /src

RUN touch config/.env
RUN echo "VITE_API_URL=$API_URL \
          VITE_API_VERSION=$API_VERSION \
          VITE_APP_VERSION=$APP_VERSION \
          VITE_APP_BRANCH=$CI_COMMIT_BRANCH \
          VITE_BUILD_ID=$CI_COMMIT_SHORT_SHA \
          VITE_TITLE_NAME=$TITLE_NAME \
          VITE_HOME_NAME=$HOME_NAME" >> config/.env

RUN npm install vite -g
RUN npm install

RUN npm run build_stage

FROM nginx:1.25.3-alpine as web_server
LABEL authors="lysak.yaroslav00@yandex.ru"

COPY --from=builder /src/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY build/nginx/default.conf /etc/nginx/conf.d


CMD ["nginx", "-g", "daemon off;"]
