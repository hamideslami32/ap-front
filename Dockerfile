FROM node:lts-alpine

# Create app directory
WORKDIR /app

ADD package.json package-lock.json /app/

RUN npm install

ADD . /app/

# global install & update

ENV HOST 0.0.0.0

ENV NODE_ENV production

ARG API_URL
ARG STATIC_URL
ARG DOMAIN_URL
ARG PUBLIC_PATH

ENV API_URL $API_URL
ENV STATIC_URL $STATIC_URL
ENV DOMAIN_URL $DOMAIN_URL
ENV PUBLIC_PATH $PUBLIC_PATH

RUN npm run build

EXPOSE 3000

# start command
CMD ["npm", "run", "start"]
