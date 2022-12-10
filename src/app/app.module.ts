import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayingComponent } from './playing/playing.component';
import { ResultsComponent } from './results/results.component';
import { InitComponent } from './init/init.component';
import { StoreModule } from '@ngrx/store';
import { featureName, managerReducer } from './store/manager.reducer';

@NgModule({
  declarations: [
    AppComponent,
    PlayingComponent,
    ResultsComponent,
    InitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ [featureName]: managerReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
