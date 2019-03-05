import { AppPage } from './app.po';
import {browser, by, element } from 'protractor';
// Test bed
describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display navbar with title',  async () => {
    /*page.navigateTo().then(() => {
      console.log('Successfully connected to the page');
      expect(page.getHeaderText()).toEqual('hobbies');

    });*/
    browser.get('http://localhost:4200').then(() => {
      console.log('Successfully connected to the page');
    });

    browser.driver.wait(() => {
      return browser.isElementPresent(by.css('app-header nav'));
    }, 11000);

    expect(browser.isElementPresent(by.css('app-header nav'))).toBeTruthy();

    expect(element(by.css('app-header nav')).getText()).toEqual('hobbies');

  });

  it('should fill in info', async() => {
    browser.get('http://localhost:4200');

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
    });

    // wait for http requests to finish
    browser.driver.sleep(20000);

    browser.wait(() => {
      return browser.isElementPresent(element(by.cssContainingText('app-list li', 'Armando Leon likes coding')));
    }, 30000);

    expect(element(by.css('app-list li')).getText()).toEqual('Armando Leon likes coding');

  });
});
