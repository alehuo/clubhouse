FROM node:10.16.2-alpine

WORKDIR /frontend

RUN apk add --no-cache --virtual .build-deps \
    git

COPY package*.json tsconfig.json tslint.json ./

RUN npm install

# Clean up
RUN apk del .build-deps 

COPY src ./src
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]