const config = require('./protractor.conf').config;

// Tell protrator where the chrome driver is
// https://gitlab.com/dasch8/angular-ci/
// https://hub.docker.com/r/weboaks/node-karma-protractor-chrome/
config.chromeDriver = '/usr/bin/chromedriver';

config.allScriptsTimeout = 20000;

// have it connect to the selenium grid
config.baseUrl = 'http://0.0.0.0:4444/wd/hub';

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--no-sandbox']
  }
};

exports.config = config;
