FROM nginx:1.15.7-alpine

RUN apk add --no-cache --virtual .build-deps \
    git

WORKDIR /frontend

COPY package*.json tsconfig.json tslint.json ./

RUN npm install

COPY src ./src
COPY public ./public

RUN npm run build && \
    cp -R build /var/www

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /var/www

# Clean up
RUN apk del .build-deps && rm -rf /frontend

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]