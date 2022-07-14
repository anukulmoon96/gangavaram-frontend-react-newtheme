FROM node:16-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm i --legacy-peer-deps --openssl-legacy-provider
COPY . ./
CMD ["npm","run","dev","--","--host"]
