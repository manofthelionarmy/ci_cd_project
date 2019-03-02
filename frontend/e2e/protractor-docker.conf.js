/**
 * Remember to check out this link for the other options in
 * Proctractor:
 * https://github.com/angular/protractor/blob/master/lib/config.ts
 */

let config = require('./protractor.conf').config;


config.allScriptsTimeout = 30000;


// use the chromeDriver, as specified
config.directConnect = false;

// have it connect to the angular app
config.baseUrl = "http://localhost:4200";

// have it connect to selenium
// the network interface is the name of the selenium container, 'selenium'
config.seleniumAddress = 'http://selenium-hub:4444/wd/hub';


exports.config = config;
