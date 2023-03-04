# Base image
FROM node:18
# Create app directory
WORKDIR /personal-blog/backend
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Install app dependencies
RUN npm install
# Install babel
RUN npm install -g @babel/core @babel/cli
# Bundle app source
COPY . .
# Creates a "dist" folder with the production build
RUN npm run build
# Set NODE_ENV environment variable
ENV NODE_ENV production
# Start the server using the production build
CMD [ "node", "dist/main.js" ]