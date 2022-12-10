import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './init/init.component';
import { PlayingComponent } from './playing/playing.component';
import { ResultsComponent } from './results/results.component';

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
