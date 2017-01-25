import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AudioService } from '../services/audio.service';
import { PlayerPositionService } from '../services/player-position.service';
import { Track } from '../services/track.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnChanges, OnInit {
  @Input() track: BehaviorSubject<Track>;
  @ViewChild('audioBar') audioBar;

  public timeElapsed: string;
  public timeRemaining: string;
  public percentElapsed: number;
  public percentLoaded: number;
  public playerStatus: string;

  private audiobarVisible: boolean = false;
  private parentHeight: number;

  constructor(private audioService: AudioService, private positionService: PlayerPositionService) { }

  ngOnInit() {
    this.getPlayerStatus();
    this.getTimeElapsed();
    this.getTimeRemaining();
    this.getPercentLoaded();
    this.getPercentElapsed();
    this.initPlayerPosition();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['track'].currentValue) {
      let nextTrack = changes['track'].currentValue;
      this.audioService.setCurrentTrack(nextTrack);
    }
  }

  initPlayerPosition() {
    this.parentHeight = this.positionService.getInnerHeight();
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

  public seekAudio(event) {
    let position = event.srcElement.value / (100 / this.audioService.getAudio().duration);
    this.audioService.seekAudio(position);
  }

  public toggleAudiobar() {
    (this.audiobarVisible) ? this.closeAudiobar() : this.openAudiobar();
    this.audiobarVisible = !this.audiobarVisible;
  }

  public openAudiobar() {
    let audioBar = this.audioBar.nativeElement;
    audioBar.style['transition'] = '300ms cubic-bezier(0.855, 0.005, 0.175, 1.2)';
    audioBar.style['transform'] = 'translate3d(0, -' + (this.parentHeight) + 'px, 0)';
    console.log('Open');
  }

  public closeAudiobar() {
    let audioBar = this.audioBar.nativeElement;
    audioBar.style['transition'] = '300ms cubic-bezier(0.855, 0.005, 0.175, 1.2)';
    audioBar.style['transform'] = 'translate3d(0, 0, 0)';
  }
}
