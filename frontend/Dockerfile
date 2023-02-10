FROM node:18-alpine as build-stage

WORKDIR /app

COPY . . 

RUN npm install && npm run build

FROM nginx

RUN rm -rf /usr/share/nginx/html

COPY --from=build-stage /app/build /usr/share/nginx/html

