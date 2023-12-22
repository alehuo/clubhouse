FROM node:10-alpine AS build
WORKDIR /data
RUN apk add --no-cache --virtual .build-deps \
        python \
        make \
        g++ \
        git

COPY backend/package.json ./backend/package.json
COPY backend/package-lock.json ./backend/package-lock.json

WORKDIR /data/backend
RUN npm install

WORKDIR /data
RUN apk del .build-deps

COPY backend ./backend
COPY shared ./shared
RUN cd /data/shared && \
    npm link && \
    cd /data/backend && \
    npm link @alehuo/clubhouse-shared

WORKDIR /data/backend
RUN npm run build
CMD [ "node", "dist/src/index.js" ]