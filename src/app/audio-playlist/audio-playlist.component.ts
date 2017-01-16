import { Component, OnInit } from '@angular/core';
import { Track } from './services/track.model';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-audio-playlist',
  templateUrl: './audio-playlist.component.html',
  styleUrls: ['./audio-playlist.component.sass']
})
export class AudioPlaylistComponent implements OnInit {
  public playerStatus: string;
  public currentTrack: Track;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.getPlayerStatus();
    this.currentTrack = new Track('http://s3.amazonaws.com/Treefort-Music-Fest/delicatesteve.mp3', 'Delicate Steve', 'Another Song', '', 1);

    setTimeout(() => {
      this.currentTrack = new Track('http://s3.amazonaws.com/Treefort-Music-Fest/why.mp3', 'Why?', 'This Song', '', 2);
    }, 3000);
  }

  public getPlayerStatus() {
    this.audioService.getPlayerStatus()
      .debounceTime(100)
      .subscribe((status) => {
        if (status === 'ended') {
          console.log('Track ended');
        }
        this.playerStatus = status;
        console.log(status);
      });
  }

}

