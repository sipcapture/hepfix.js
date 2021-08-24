# HEPFIX Docker Example
FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
EXPOSE 4739

# Run w/ local config.js
# docker run -p 4739:4739 -v $(pwd)/config.js:/config.js sipcapture/hepfix.js 

CMD [ "npm", "start" ]
