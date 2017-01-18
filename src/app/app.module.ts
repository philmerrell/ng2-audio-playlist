import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AudioPlaylistModule } from './audio-playlist/audio-playlist.module';
import { SoundCloudService } from './services/sound-cloud.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AudioPlaylistModule
  ],
  providers: [SoundCloudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
