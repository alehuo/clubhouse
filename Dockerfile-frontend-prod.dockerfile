FROM node:10-alpine AS build

WORKDIR /data

RUN apk add --no-cache --virtual .build-deps \
    git

COPY package.json yarn.lock ./
COPY frontend ./frontend
COPY shared ./shared

RUN yarn install --frozen-lockfile && \ 
    apk del .build-deps

WORKDIR /data/frontend

RUN yarn build

FROM nginx:1.15.7-alpine

WORKDIR /var/www
COPY --from=build /data/frontend/build .
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]