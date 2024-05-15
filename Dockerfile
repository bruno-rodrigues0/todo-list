FROM node:latest

WORKDIR /api

COPY . .

RUN rm -rf node_modules
RUN yarn install

CMD ["yarn", "start"]

EXPOSE 5002