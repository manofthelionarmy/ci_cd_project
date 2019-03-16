import { AppPage } from './app.po';
import {browser, by, element } from 'protractor';
// Test bed
describe('workspace-project App', () => {
  // let page: AppPage;

  beforeEach(() => {
    // page = new AppPage();
    // browser.waitForAngularEnabled(false);
    // works with machine ip
    // browser.get('http://192.168.99.101:80');
    browser.get('/');
  });

  it('should display navbar with title',  () => {

    browser.sleep(500);

    browser.driver.wait(() => {
      // browser.waitForAngularEnabled(false);
      return browser.isElementPresent(by.css('app-header nav'));
    }, 60000);

    expect(browser.isElementPresent(by.css('app-header nav'))).toBeTruthy();

    expect(element(by.css('app-header nav')).getText()).toEqual('hobbies');

  });

  it('should fill in info', () => {

    //

    // browser.waitForAngularEnabled(false);

    browser.sleep(500);
    // browser.driver.get('http://e2e:80');

    // browser.refresh();

    element(by.id('nameInput')).sendKeys('Armando Leon').then(() => {
      console.log('Succesfully filled in name');
    }).catch(() => {
      console.log('Something went wrong while filling in name');
    });

    element(by.id('hobbyInput')).sendKeys('coding').then(() => {
      console.log('Succesfully filled in hobby');
    }).catch(() => {
      console.log('Something went wrong while filling in hobby');
    });

    element(by.css('app-hobbies .btn')).click().then(() => {
      console.log('Successfully clicked the form button');
    }).catch(() => {
      console.log('Something went wrong while trying to click');
    });

    // wait for http requests to finish
    // browser.driver.sleep(10000);
    // browser.waitForAngularEnabled(true);

    browser.wait(() => {
      // browser.waitForAngularEnabled(false);
      return browser.isElementPresent(element(by.cssContainingText('app-list li', 'Armando Leon likes coding')));
    }, 60000);

    expect(element(by.css('app-list li')).getText()).toEqual('Armando Leon likes coding');

  });
});
