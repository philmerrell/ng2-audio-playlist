import { Component } from '@angular/core';
import { Track } from './audio-playlist/services/track.model';
import { SoundCloudService } from './services/sound-cloud.service';

declare var SC: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public myPlaylist: Track[] = [
    new Track('http://s3.amazonaws.com/Treefort-Music-Fest/why.mp3', 'Why?', 'This Song with an extremly long title part II', 'http://klfm.org/wp-content/uploads/2016/11/homepage_large.793356a6.jpg')
  ];

  constructor(private soundCloud: SoundCloudService) {
    this.initializeSoundCloud();
  }

  getLargeImage(url) {
    if (url) {
      let image = url.replace('-large', '-t500x500')
      return image;
    } else {
      // TODO: return some default image... 
      return null;
    }
  }

  initializeSoundCloud() {
    SC.initialize({
      client_id: this.soundCloud.getApiKey()
    });
  }

  searchSoundCloud(query) {
    SC.get('/tracks', { q: query })
      .then((tracks) => {
        this.extractTracks(tracks);
      });
  }

  extractTracks(tracks) {
    this.myPlaylist = [];
    for (let track of tracks) {
      let mp3Url = track.stream_url + '?client_id=' + this.soundCloud.getApiKey();
      let image = this.getLargeImage(track.artwork_url);
      this.myPlaylist.push(new Track(mp3Url, track.user.username, track.title, image));
    }
  }

}
