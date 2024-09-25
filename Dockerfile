FROM node:22-alpine3.19

RUN mkdir -p /usr/src/ded
WORKDIR /usr/src/ded
COPY . .

RUN npm install -D oxc-parser
RUN npm ci && npm cache clean --force
RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=4000

EXPOSE 4000 

ENTRYPOINT ["node", ".output/server/index.mjs"]