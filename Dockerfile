FROM node:14

WORKDIR /app

RUN npm i -g @nestjs/cli@8.1.1

COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps --force

ADD . .

RUN npm run build

COPY docker-entrypoint.sh ./docker-entrypoint.sh

RUN chmod +x ./docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
