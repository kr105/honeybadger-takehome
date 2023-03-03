FROM node:18-alpine
WORKDIR /usr/src/app

ARG LISTEN_PORT

COPY . .
RUN npm install

EXPOSE ${LISTEN_PORT}
CMD [ "node", "index.js" ]