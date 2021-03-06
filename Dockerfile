FROM node:10.15

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

ENV NODE_ENV=production

COPY . /usr/src/app

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 8080

CMD ["npm", "run", "serve"]