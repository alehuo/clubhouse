FROM node:10-alpine AS build
WORKDIR /data
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        git

COPY package.json yarn.lock ./
COPY backend ./backend
COPY shared ./shared
RUN yarn install --frozen-lockfile && \ 
    apk del .gyp

WORKDIR /data/backend
RUN yarn build
CMD [ "node", "dist/src/index.js" ]