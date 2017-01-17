import { Component } from '@angular/core';
import { Track } from './audio-playlist/services/track.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public myPlaylist: Track[] = [
    new Track('http://s3.amazonaws.com/Treefort-Music-Fest/delicatesteve.mp3', 'Delicate Steve', 'Another Song', '', 0),
    new Track('http://s3.amazonaws.com/Treefort-Music-Fest/why.mp3', 'Why?', 'This Song', '', 1)
  ];

}
