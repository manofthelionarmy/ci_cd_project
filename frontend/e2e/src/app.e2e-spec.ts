import { AppPage } from './app.po';

// Test bed
describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display navbar with title',  (done) => {
    page.navigateTo().then(() => {
      console.log('Successfully connected to the page');
      expect(page.getHeaderText()).toEqual('hobbies');
      done();
    });

  });
});
