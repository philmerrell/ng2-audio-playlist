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
    new Track('https://api.soundcloud.com/tracks/62188129/stream?client_id=df942240e3e63f8e23596df0893eab2a', 'Mac Demarco', 'Ode to Viceroy', 'https://i1.sndcdn.com/artworks-000031540797-8io3vh-t500x500.jpg')
  ];

  public soundCloudResults: Track[];

  constructor(private soundCloud: SoundCloudService) {
    this.initializeSoundCloud();
  }

  getLargeImage(url: string) {
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

  searchSoundCloud(query: string) {
    SC.get('/tracks', { q: query })
      .then((tracks) => {
        this.extractTracks(tracks);
      });
  }

  addTrack(track) {
    this.myPlaylist.push(track);
    console.log(this.myPlaylist);
  }

  extractTracks(tracks) {
    // this.myPlaylist = [];
    this.soundCloudResults = [];
    for (let track of tracks) {
      let mp3Url = track.stream_url + '?client_id=' + this.soundCloud.getApiKey();
      let image = this.getLargeImage(track.artwork_url);
      this.soundCloudResults.push(new Track(mp3Url, track.user.username, track.title, image));
    }
  }

}
