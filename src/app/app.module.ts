import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayingComponent } from './pages/playing-page/playing.component';
import { ResultsComponent } from './pages/results-page/results.component';
import { InitComponent } from './pages/init-page/init.component';
import { StoreModule } from '@ngrx/store';
import { featureName, managerReducer } from './store/manager.reducer';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ManagerEffects } from './store/manager.effect';

const routes: Routes = [{
  path: 'init',
  component: InitComponent
}, {
  path: 'playing',
  component: PlayingComponent
}, {
  path: 'results',
  component: ResultsComponent
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: 'init'
}, {
  path: '**',
  redirectTo: 'init'
}];

@NgModule({
  declarations: [
    AppComponent,
    PlayingComponent,
    ResultsComponent,
    InitComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true // ゲームだしSEOいらないのでHashモードでいい気がした
    }),
    StoreModule.forRoot({ [featureName]: managerReducer }),
    EffectsModule.forRoot([ManagerEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
