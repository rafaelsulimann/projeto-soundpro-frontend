FROM ubuntu as build
WORKDIR /app
RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive && \
    apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install yarn
COPY ./ ./
RUN yarn
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]