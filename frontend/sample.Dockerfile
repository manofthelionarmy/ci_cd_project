# This Docker File works too, but it has too many layers

################
##    init    ##
################

FROM  node:10-alpine AS init
RUN  mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend
COPY package.json /usr/src/frontend
RUN npm cache clean --force \
  && npm install
COPY . /usr/src/frontend

#################
## development ##
#################

FROM node:10-alpine AS development
COPY --from=init /usr/src/frontend /usr/src/frontend
WORKDIR /usr/src/frontend
EXPOSE 4200
CMD ["npm", "start"]


##################
##     test     ##
##################

FROM node:10-alpine AS test
COPY --from=init /usr/src/frontend /usr/src/frontend
WORKDIR /usr/src/frontend
RUN apk update && \
    apk upgrade && \
    apk add --no-cache chromium nss
EXPOSE 9876
ENV CHROME_BIN /usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV SASS_BINARY_NAME=linux-x64-67
CMD [ "npm", "test"]

###################
##    builder    ##
###################

FROM node:10-alpine AS builder
COPY --from=init /usr/src/frontend /usr/src/frontend
WORKDIR /usr/src/frontend
RUN npm run build --prod

##################
##  production  ##
##################

FROM nginx:alpine AS production
COPY --from=builder /usr/src/frontend/dist/frontend /usr/share/nginx/html
COPY --from=builder /usr/src/frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

