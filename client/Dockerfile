FROM node:18 as build

COPY . .
RUN yarn
RUN yarn add styled-components
RUN yarn build

FROM nginx:alpine
COPY default.conf   /etc/nginx/conf.d/default.conf
COPY --from=build /dist/ /usr/share/nginx/html
