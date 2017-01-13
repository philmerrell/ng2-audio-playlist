import { AudioPlaylistPage } from './app.po';

describe('audio-playlist App', function() {
  let page: AudioPlaylistPage;

  beforeEach(() => {
    page = new AudioPlaylistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
