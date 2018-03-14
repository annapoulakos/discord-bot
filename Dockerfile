FROM mhart/alpine-node:8 as build-env

WORKDIR /app
COPY package.json ./

RUN npm install --production

FROM mhart/alpine-node:base-8
WORKDIR /app
COPY --from=build-env /app .
COPY . .

CMD [ "node", "bot.js", "./config.json" ]
