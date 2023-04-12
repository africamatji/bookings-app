FROM node:16.14.2-alpine

# update dependencies
#RUN apk update && apk upgrade

# create.destination.directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR  /usr/src/nuxt-app

#set production environment
RUN export NODE_ENV=production

# copy nuxt files
COPY . /usr/src/nuxt-app/
RUN yarn install

RUN yarn build

EXPOSE 80

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=80

CMD [ "yarn", "start"]
