ARG HOME_DIR="/var/www"
ARG PORT=3000

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
RUN npm install --production

COPY --from=builder ${HOME_DIR}/dist ./dist

EXPOSE "${PORT}"

CMD ["npm", "run", "start"]