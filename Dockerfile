FROM node:current-slim

WORKDIR /client

COPY /src /client/src
COPY /public /client/public
COPY next.config.mjs /client/
COPY package.json /client/
COPY package-lock.json /client/
COPY jsconfig.json /client/

RUN npm install
RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start"]