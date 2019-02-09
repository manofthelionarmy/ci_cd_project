# I can override this image by:
# docker run -it --name nodejs -p 3000:3000 --network backend npm run unit_test 
# make sure mongo and nodejs are on the same network (in dev envrionment the driver for the 
# network has to be bridge)
# docker container run --name db -p 27017:27017 --network backend mongo
# That above will allow me to run the tests, so development env will also serve as my test env

# I'm not sure if I can do the same pattern from article in this Dockerfile,
# because I don't need all the files for production. 
# update: I found out a way to do it, as stated below. I just had to rm the ./tests folder ;)

# build for the production image
FROM node:10-alpine as builder
RUN mkdir -p /usr/src/backend
COPY package.json /usr/src/backend
WORKDIR /usr/src/backend
RUN npm cache clean --force && \
    npm install --production
COPY . /usr/src/backend

FROM node:10-alpine as production
COPY --from=builder /usr/src/backend /usr/src/backend
WORKDIR /usr/src/backend
#We don't need tests in our final build
RUN rm -rf ./tests
EXPOSE 3000
CMD ["node", "./src/app/main.js"] 


FROM node:10-alpine as development
COPY --from=builder /usr/src/backend /usr/src/backend
WORKDIR /usr/src/backend
# need to install our devDependencies too
RUN npm cache clean --force \
    && npm install
EXPOSE 3000
CMD ["npm", "start"]

# Our final steps always ensure the final image build will be our production image
FROM production