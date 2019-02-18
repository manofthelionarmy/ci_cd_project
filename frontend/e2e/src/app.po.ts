import { browser, by, element } from 'protractor';

export class AppPage {

  // navigates to main page
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }
}
