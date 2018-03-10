FROM node:6.11.0-wheezy

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app


WORKDIR /


EXPOSE 9988 



WORKDIR /usr/src/app


CMD [ "node", "app.js" ]