# I can override this image by:
# docker run -it --name nodejs -p 3000:3000 --network backend npm run unit_test 
# make sure mongo and nodejs are on the same network (in dev envrionment the driver for the 
# network has to be bridge)
# docker container run --name db -p 27017:27017 --network backend mongo
# That above will allow me to run the tests, so development env will also serve as my test env

# I'm not sure if I can do the same pattern from article in this Dockerfile,
# because I don't need all the files for production. 
# update: I found out a way to do it, as stated below. I just had to rm the ./tests folder ;)

###################
##    builder    ##
###################

FROM node:10 as builder
RUN mkdir -p /usr/src/backend
COPY package.json /usr/src/backend
WORKDIR /usr/src/backend
RUN npm cache clean --force && \
    npm install --production
COPY . /usr/src/backend

##################
##  production  ##
##################

# we won't use FROM builder because in the future we may have grunt or gulp scripts to automate builds
# or, we may use another image for deployment (like apline)
FROM node:10-alpine as production
COPY --from=builder /usr/src/backend /usr/src/backend
WORKDIR /usr/src/backend
#We don't need tests in our final build
RUN rm -rf ./tests
EXPOSE 3000
CMD ["node", "./src/app/main.js"] 

#################
## development ##
#################

# development uses the same stuff from builder, we just need to install our devDependencies
FROM builder as development
RUN npm cache clean --force \
    && npm install
EXPOSE 3000
CMD ["npm", "start"]

# Our final steps always ensure the final image build will be our production image
FROM production