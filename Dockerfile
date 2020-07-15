FROM node:lts-alpine

# Create app directory
WORKDIR /app

ADD package.json package-lock.json /app/

RUN npm install

ADD . /app/

# global install & update

ENV HOST 0.0.0.0

ENV NODE_ENV production

RUN npm run build

EXPOSE 3000

# start command
CMD ["npm", "run", "start"]
