import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlaylistComponent } from './audio-playlist.component';
import { PlayerComponent } from './player/player.component';
import { AudioService } from './services/audio.service';
import { PlaylistService } from './services/playlist.service';

@NgModule({
  declarations: [
    AudioPlaylistComponent,
    PlayerComponent
  ],
  exports: [
    AudioPlaylistComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [ AudioService, PlaylistService ]
})
export class AudioPlaylistModule {}
