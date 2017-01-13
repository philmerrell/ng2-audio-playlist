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

  constructor(public audioService: AudioService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let nextTrack = changes['track'].currentValue;
    console.log(nextTrack);
    // console.log('Changes: ', changes);
    this.audioService.setCurrentTrack(nextTrack);
  }

}
