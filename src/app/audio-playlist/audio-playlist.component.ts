import { Component, OnInit } from '@angular/core';
import { Track } from './services/track.model';

@Component({
  selector: 'app-audio-playlist',
  templateUrl: './audio-playlist.component.html',
  styleUrls: ['./audio-playlist.component.sass']
})
export class AudioPlaylistComponent implements OnInit {
  currentTrack: Track;
  constructor() { }

  ngOnInit() {
    this.currentTrack = new Track('http://s3.amazonaws.com/Treefort-Music-Fest/delicatesteve.mp3', 'Delicate Steve', '', '', '', 1);

    setTimeout(() => {
      this.currentTrack = new Track('http://s3.amazonaws.com/Treefort-Music-Fest/why.mp3', 'Why?', '', '', '', 1);
    }, 3000);
  }

}

