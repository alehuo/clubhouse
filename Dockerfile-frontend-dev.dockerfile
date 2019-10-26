FROM node:10-alpine

WORKDIR /data

RUN apk add --no-cache --virtual .build-deps \
    git

COPY package.json yarn.lock ./
COPY frontend ./frontend
COPY shared ./shared

RUN yarn install --frozen-lockfile && \ 
    apk del .build-deps

WORKDIR /data/frontend

CMD ["yarn","start"]