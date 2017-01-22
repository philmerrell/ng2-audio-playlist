import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Track } from './services/track.model';
import { AudioService } from './services/audio.service';
import { PlaylistService } from './services/playlist.service';

@Component({
  selector: 'app-audio-playlist',
  templateUrl: './audio-playlist.component.html',
  styleUrls: ['./audio-playlist.component.scss']
})
export class AudioPlaylistComponent implements OnInit {
  @Input() playlist: Track[];

  public currentTrack: Track;
  private Status: { Queued, Initiated };

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.currentTrack = this.playlist[0];
    this.getPlayerStatus();
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

  public playTrack(track) {
    this.currentTrack = track;
  }

  public checkPlaylist() {
    let progress = this.currentTrack.index + 1;
    if (progress === this.playlist.length) {
      // stop audio 
    } else {
      this.currentTrack = this.playlist[progress];
    }
  }

}
