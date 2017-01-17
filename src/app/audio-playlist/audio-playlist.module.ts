import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlaylistComponent } from './audio-playlist.component';
import { PlayerComponent } from './components/player/player.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { AudioService } from './services/audio.service';
import { PlaylistService } from './services/playlist.service';

@NgModule({
  declarations: [
    AudioPlaylistComponent,
    PlayerComponent,
    PlaylistComponent
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
