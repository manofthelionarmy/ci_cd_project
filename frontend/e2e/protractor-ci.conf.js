/**
 * Remember to check out this link for the other options in
 * Proctractor:
 * https://github.com/angular/protractor/blob/master/lib/config.ts
 */

const config = require('./protractor.conf').config;

// Tell protrator where the chrome driver is
// https://gitlab.com/dasch8/angular-ci/
// https://hub.docker.com/r/weboaks/node-karma-protractor-chrome/
config.chromeDriver = "/usr/bin/chromedriver";

config.allScriptsTimeout = 20000;


// use the chromeDriver, as specified
config.directConnect = true;

// have it connect to the angular app
config.baseUrl = "http://0.0.0.0:4200";

// have it connect to selenium
// the network interface is the name of the selenium container, 'selenium'
config.seleniumAddress = 'http://selenium:4444/wd/hub';

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--no-sandbox', '--disable-gpu']
  },

};


exports.config = config;
