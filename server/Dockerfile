FROM node:16

# Create app directory
WORKDIR /proxy

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./proxy

# Bundle app source
COPY . /proxy

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 3000
CMD [ "npm", "run", "start" ]
CMD [ "npm", "run", "gui" ]