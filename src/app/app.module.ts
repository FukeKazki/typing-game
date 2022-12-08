import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayingComponent } from './playing/playing.component';
import { ResultsComponent } from './results/results.component';
import { InitComponent } from './init/init.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayingComponent,
    ResultsComponent,
    InitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
