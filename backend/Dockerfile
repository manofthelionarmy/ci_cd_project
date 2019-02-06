FROM node:8.11.1
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app
WORKDIR /usr/src/app
RUN npm cache verify \
    && npm install
# COPY src /usr/src/app
COPY . /usr/src/app
EXPOSE 3000
# CMD ["node", "app/main.js"]
CMD ["npm", "start"]