FROM node:12-alpine

RUN mkdir -p /usr/src/app/saving
WORKDIR /usr/src/app/saving
COPY package.json /usr/src/app/saving/package.json
RUN cd /usr/src/app/saving && npm i
RUN npm i -g serverless 
RUN npm i -g serverless-webpack
RUN npm i
# RUN ["chmod", "+x", "/docker-entrypoint-initdb.d/docker-postgresql-multiple-databases.sh"]

CMD ["npm", "start"]