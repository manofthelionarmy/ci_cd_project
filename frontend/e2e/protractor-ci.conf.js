/**
 * Remember to check out this link for the other options in
 * Proctractor:
 * https://github.com/angular/protractor/blob/master/lib/config.ts
 */

let ci_config = require('./protractor.conf').config;

// Tell protrator where the chrome driver is
// https://gitlab.com/dasch8/angular-ci/
// https://hub.docker.com/r/weboaks/node-karma-protractor-chrome/
ci_config.chromeDriver = "/usr/bin/chromedriver";

ci_config.allScriptsTimeout = 30000;


// use the chromeDriver, as specified
ci_config.directConnect = true;

// have it connect to the angular app
ci_config.baseUrl = "http://0.0.0.0:4200";

// have it connect to selenium
// the network interface is the name of the selenium container, 'selenium'
ci_config.seleniumAddress = 'http://selenium-hub:4444/wd/hub';

ci_config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--no-sandbox', 'disable-gpu']
  },

};


exports.config = ci_config;
