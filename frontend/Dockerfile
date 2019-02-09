# Development also has the test scripts so I can
# develop and test with one image on my local machine
# After testing around, this is the fastest way to build my project
# To have less layers, I can use a slim image of node and have one Env variable
# and install chromium with one line, but the development image will be bigger as a cost.

# I read this article for multistage build patterns and it suggested to have prodction
# stage before development and test.
# I followed the advice. I did production first and development last. It did all the stages
# by building the docker image without targeting production stage.
# Though it took a while, when I built the development image by targeting development,
# it happened so fast. That is because all the necessary steps were built (meaning every step was cached)
# The last line is important because the last stage makes sure our final image is the production image.
FROM node:10-alpine as builder
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app
WORKDIR /usr/src/app
RUN npm cache clean --force && \
    npm install
COPY . /usr/src/app
RUN npm run build --prod


FROM nginx:1.13.9-alpine as production
COPY --from=builder /usr/src/app/dist/frontend /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


FROM node:10-alpine as development
COPY --from=builder /usr/src/app /usr/src/app
WORKDIR /usr/src/app
RUN apk update && \
    apk upgrade && \
    apk add --no-cache chromium nss
EXPOSE 4200
ENV CHROME_BIN /usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV SASS_BINARY_NAME linux-x64-67
CMD [ "npm", "run", "start" ]

FROM production



