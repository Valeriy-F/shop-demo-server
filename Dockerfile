ARG HOME_DIR="/var/www"
ARG PORT=3001

FROM node:19-bullseye-slim as dependencies
ARG HOME_DIR
RUN mkdir -p "${HOME_DIR}"
WORKDIR ${HOME_DIR}
COPY package*.json ./
RUN npm install

FROM node:19-bullseye-slim as builder
ARG HOME_DIR
RUN mkdir -p "${HOME_DIR}"
WORKDIR ${HOME_DIR}
COPY . .
COPY --from=dependencies ${HOME_DIR}/node_modules ./node_modules
RUN npm run build

FROM node:19-bullseye-slim as runner
ARG HOME_DIR
ARG PORT
RUN mkdir -p "${HOME_DIR}"
WORKDIR ${HOME_DIR}
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder ${HOME_DIR}/.env ./
COPY --from=builder ${HOME_DIR}/build ./build
COPY --from=builder ${HOME_DIR}/public/products ./public/products

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.12.1/wait /wait
RUN chmod +x /wait

EXPOSE "${PORT}"

CMD /wait && npm run start
