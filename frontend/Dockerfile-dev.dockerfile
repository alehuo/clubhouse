FROM node:10-alpine

WORKDIR /frontend

RUN apk add --no-cache --virtual .build-deps \
    git

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Clean up
RUN apk del .build-deps 

COPY src ./src
COPY public ./public

EXPOSE 3000

CMD ["yarn", "start"]