# I can override this image by:
# docker run -it --name nodejs -p 3000:3000 --network backend npm run unit_test 
# make sure mongo and nodejs are on the same network (in dev envrionment the driver for the 
# network has to be bridge)
# docker container run --name db -p 27017:27017 --network backend mongo
# That above will allow me to run the tests, so development env will also serve as my test env

# I'm not sure if I can do the same pattern from article in this Dockerfile,
# because I don't need all the files for production. 
FROM node:10-alpine as development
RUN mkdir -p /usr/src/backend
COPY package.json /usr/src/backend
WORKDIR /usr/src/backend
RUN npm cache clean --force \
    && npm install
# COPY src /usr/src/app
COPY . /usr/src/backend
EXPOSE 3000
# CMD ["node", "app/main.js"]
CMD ["npm", "start"]

FROM node:10-alpine as production
COPY --from=development /usr/src/backend/src /usr/src/
COPY --from=development /usr/src/backend/package.json /usr/src
WORKDIR /usr/src
RUN npm cache clean --force \
# npm install --produciton will just install dev dependencies, not dev dependencies 
    && npm install --production
WORKDIR /usr/src/app
EXPOSE 3000
CMD ["node", "main.js"] 