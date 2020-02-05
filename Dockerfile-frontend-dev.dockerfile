FROM node:10-alpine

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

CMD ["npm","start"]