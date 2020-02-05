FROM node:10-alpine AS build

WORKDIR /data

RUN apk add --no-cache --virtual .build-deps \
    git

COPY frontend/package.json ./frontend/package.json
COPY frontend/package-lock.json ./frontend/package-lock.json

WORKDIR /data/frontend
RUN npm install

WORKDIR /data
RUN apk del .build-deps

COPY frontend ./frontend
COPY shared ./shared

RUN cd shared && \
    npm link && \
    cd ../frontend && \
    npm link @alehuo/clubhouse-shared

WORKDIR /data/frontend

RUN npm run build

FROM nginx:1.15.7-alpine

WORKDIR /var/www
COPY --from=build /data/frontend/build .
COPY --from=build /data/frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]