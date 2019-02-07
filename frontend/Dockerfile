# regular node images are based upon debian.
FROM node:10-alpine as stage1

# Install chromium for headless testing
#RUN apt-get update \
#    && apt-get install -y chromium chromium-l10n
RUN  mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm cache clean --force \
    && npm install
COPY . /usr/src/app
#EXPOSE 4200
# make sure to export the chromium location
#ENV CHROME_BIN /usr/bin/chromium
#CMD [ "npm", "start" ]

FROM node:10-alpine as development
COPY --from=stage1 /usr/src/app /usr/src/app
WORKDIR  /usr/src/app
RUN apk update && apk upgrade && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
  apk add --no-cache bash chromium@edge nss@edge
EXPOSE 4200
ENV CHROME_BIN /usr/bin/chromium-browser
CMD [ "npm", "run", "start" ]


FROM node:alpine as builder
COPY --from=stage1 /usr/src/app /usr/src/app
WORKDIR  /usr/src/app
RUN npm run build


FROM nginx:1.13.9-alpine as production
COPY --from=builder /usr/src/app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
