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
    // new Track('http://s3.amazonaws.com/Treefort-Music-Fest/delicatesteve.mp3', 'Delicate Steve', 'Another Song', '', 0),
    new Track('http://s3.amazonaws.com/Treefort-Music-Fest/why.mp3', 'Why?', 'This Song', 'http://klfm.org/wp-content/uploads/2016/11/homepage_large.793356a6.jpg', 1)
  ];

  constructor(private soundCloud: SoundCloudService) {
    this.initializeSoundCloud();
  }

  initializeSoundCloud() {
    SC.initialize({
      client_id: this.soundCloud.getApiKey()
    });
  }

  searchSoundCloud(query) {
    SC.get('/tracks', { q: query })
      .then((tracks) => {
        console.log('Tracks: ', tracks);
        this.extractTracks(tracks);
      });
  }

  extractTracks(tracks) {
    this.myPlaylist = [];
    for (let track of tracks) {
      this.myPlaylist.push(new Track(track.stream_url + '?client_id=' + this.soundCloud.getApiKey(), track.user.username, track.title, track.artwork_url, 0));
    }
  }

}
