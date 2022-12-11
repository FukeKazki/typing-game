import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlayingComponent } from './pages/playing-page/playing.component';
import { ResultsComponent } from './pages/results-page/results.component';
import { InitComponent } from './pages/init-page/init.component';
import { StoreModule } from '@ngrx/store';
import { featureName, managerReducer } from './store/manager.reducer';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ManagerEffects } from './store/manager.effect';
import { ButtonDirective } from './shared/directives/button.directive';
import { KeyboardComponent } from './pages/playing-page/components/keyboard/keyboard.component';
import { FormComponent } from './pages/form-page/form.component';

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
  path: 'form',
  component: FormComponent
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
    InitComponent,
    FormComponent,
    ButtonDirective,
    KeyboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true // ゲームだしSEOいらないのでHashモードでいい気がした
    }),
    StoreModule.forRoot({ [featureName]: managerReducer }),
    EffectsModule.forRoot([ManagerEffects]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
