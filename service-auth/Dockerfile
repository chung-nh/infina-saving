FROM node:12-alpine

RUN mkdir -p /usr/src/app/auth
WORKDIR /usr/src/app/auth
COPY package.json /usr/src/app/auth/package.json

RUN cd /usr/src/app/auth
RUN npm i -g serverless 
RUN npm i -g serverless-webpack
RUN npm i

CMD ["npm", "start"]