import { browser, by, element, protractor } from 'protractor';

export class AppPage {

  // navigates to main page
  navigateTo() {
    return browser.get('/');
  }

  getHeaderText() {
    return element(by.css('app-header nav')).getText();
  }
}
