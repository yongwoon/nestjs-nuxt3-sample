FROM node:20.18.0-alpine

ENV APP_ROOT /var/www

RUN mkdir -p $APP_ROOT

RUN apk update && \
  apk add git bash curl

# COPY ./package.json $APP_ROOT
# COPY ./package-lock.json $APP_ROOT

WORKDIR $APP_ROOT

# RUN npm install
COPY . $APP_ROOT

# CMD [ "npm", "run", "dev" ]