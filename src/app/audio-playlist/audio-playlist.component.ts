import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Track } from './services/track.model';
import { AudioService } from './services/audio.service';
import { PlaylistService } from './services/playlist.service';

@Component({
  selector: 'app-audio-playlist',
  templateUrl: './audio-playlist.component.html',
  styleUrls: ['./audio-playlist.component.scss']
})
export class AudioPlaylistComponent implements OnChanges, OnInit {
  @Input() playlist: Track[];

  public currentTrack: Track;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.getPlayerStatus();
    this.currentTrack = this.playlist[0];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playlist'].currentValue) {
      let changedPlaylist = changes['playlist'].currentValue;
      this.playlist = changedPlaylist;
    }
  }

  public getPlayerStatus() {
    this.audioService.getPlayerStatus()
      .debounceTime(100)
      .subscribe((status) => {
        if (status === 'ended') {
          this.checkPlaylist();
        }
      });
  }

  private playTrack(track) {
    this.currentTrack = track;
  }

  private checkPlaylist() {
    let progress = this.playlist.indexOf(this.currentTrack) + 1;
    console.log(progress);
    if (progress === this.playlist.length) {
      // stop audio 
    } else {
      this.playTrack(this.playlist[progress]);
    }
  }

}
