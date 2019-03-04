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
    browser.get('http://localhost:4200');

    browser.driver.wait(() => {
      return browser.isElementPresent(by.css('app-header nav'));
    }, 5000);

    expect(browser.isElementPresent(by.css('app-header nav'))).toBeTruthy();

    expect(element(by.css('app-header nav')).getText()).toEqual('hobbies');

  });
});
