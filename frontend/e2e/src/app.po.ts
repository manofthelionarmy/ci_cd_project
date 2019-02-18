import { browser, by, element } from 'protractor';

export class AppPage {

  // navigates to main page
  navigateTo() {
    return browser.get('/');
  }

  getHeaderText() {
    return element(by.css('app-header nav')).getText();
  }
}
