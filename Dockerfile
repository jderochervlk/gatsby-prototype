FROM node:12

WORKDIR /usr/app

EXPOSE 80 8080 9000

COPY package.json .

RUN yarn install --quiet

COPY . . 