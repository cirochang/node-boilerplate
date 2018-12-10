FROM node:chakracore-8.11

# Create app directory
WORKDIR /usr/src/foo-bar

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install --only=production
RUN npm install

# Bundle app source
COPY . .

EXPOSE $PORT 
CMD [ "npm", "start" ]
