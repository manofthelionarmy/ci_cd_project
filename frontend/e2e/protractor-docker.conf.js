/**
 * Remember to check out this link for the other options in
 * Proctractor:
 * https://github.com/angular/protractor/blob/master/lib/config.ts
 */

// protactor config for dockerized e2e tests on my local machine

let config = require('./protractor.conf').config;

// Tell protrator where the chrome driver is
// https://gitlab.com/dasch8/angular-ci/
// https://hub.docker.com/r/weboaks/node-karma-protractor-chrome/
config.chromeDriver = "/usr/bin/chromedriver";

config.allScriptsTimeout = 60000;

config.getPageTimeout = 60000;

config.jasmineNodeOpts.defaultTimeoutInterval = 60000;

// have it connect to the angular app
config.baseUrl = "http://angular:4200";

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['headless', 'no-sandbox', 'disable-gpu', 'disable-dev-shm-usage']
  },

};


exports.config = config;
