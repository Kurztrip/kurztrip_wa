FROM node:15.9.0-alpine3.13

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm","run","dev"]