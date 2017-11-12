import { PusherTestPage } from './app.po';

describe('pusher-test App', () => {
  let page: PusherTestPage;

  beforeEach(() => {
    page = new PusherTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
