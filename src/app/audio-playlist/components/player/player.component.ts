import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AudioService } from '../../services/audio.service';
import { Track } from '../../services/track.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass'],
  providers: [ AudioService ]
})
export class PlayerComponent implements OnChanges, OnInit {
  @Output() playerEvent: BehaviorSubject<string>;
  @Input() track: BehaviorSubject<Track>;

  public timeElapsed: string;
  public timeRemaining: string;
  public percentElapsed: number;
  public percentLoaded: number;
  public playerStatus: string;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.getPlayerStatus();
    this.getTimeElapsed();
    this.getTimeRemaining();
    this.getPercentLoaded();
    this.getPercentElapsed();
  }

  ngOnChanges(changes: SimpleChanges) {
    let nextTrack = changes['track'].currentValue;
    this.audioService.setCurrentTrack(nextTrack);
  }

  public toggleAudio() {
    this.audioService.toggleAudio();
    return false;
  }

  public getTimeElapsed() {
    this.audioService.getTimeElapsed()
      .subscribe(time => this.timeElapsed = time);
  }

  public getTimeRemaining() {
    this.audioService.getTimeRemaining()
      .subscribe(time => this.timeRemaining = time);
  }

  public getPercentElapsed() {
    this.audioService.getPercentElapsed()
      .subscribe(percent => this.percentElapsed = percent);
  }

  public getPercentLoaded() {
    this.audioService.getPercentLoaded()
      .subscribe(percent => this.percentLoaded = percent);
  }

  public getPlayerStatus() {
    this.audioService.getPlayerStatus()
      .debounceTime(100)
      .subscribe(status => this.playerStatus = status);
  }
}
