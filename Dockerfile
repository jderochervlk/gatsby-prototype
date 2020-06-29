FROM node:12

WORKDIR /usr/app

EXPOSE 80 8080 9000

COPY package.json .

RUN npm install --quiet

COPY . . 