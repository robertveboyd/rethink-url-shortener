FROM node:alpine as build

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx:1.19

COPY --from=build /usr/app/build/ /usr/share/nginx/html

COPY --from=build /usr/app/nginx.conf /etc/nginx/conf.d/default.conf
