FROM node:9
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/
WORKDIR /usr/src/app
COPY . /usr/src/app/
CMD [ "npm", "start" ]
EXPOSE 3000