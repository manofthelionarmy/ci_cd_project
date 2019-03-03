/**
 * Remember to check out this link for the other options in
 * Proctractor:
 * https://github.com/angular/protractor/blob/master/lib/config.ts
 */

// Proctractor config for dockerized e2e tests connecting to selenium in travis ci
let config = require('./protractor.conf').config;


// use the chromeDriver, as specified
config.directConnect = false;


// have it connect to the angular app
config.baseUrl = "http://e2e:4200";

// Protractor getting the page-timeout
config.getPageTimeout = 60000;

// Selenium Webdriver timeout
config.allScriptsTimeout = 100000;

// Jasmine test script timeout
config.jasmineNodeOpts.defaultTimeoutInterval = 180000;

// config.rootElement = 'app-root';

config.seleniumAddress = 'http://selenium-hub:4444/wd/hub'

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['headless', 'disable-gpu', 'no-sandbox'],
  },
  // seleniumAddress: 'http://localhost:4444/wd/hub'
};




exports.config = config;
