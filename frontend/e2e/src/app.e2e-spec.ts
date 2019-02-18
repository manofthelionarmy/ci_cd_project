import { AppPage } from './app.po';

// Test bed
describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display navbar with title', () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('hobbies');
  });
});
