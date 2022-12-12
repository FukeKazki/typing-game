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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environment';
import { LoginComponent } from './pages/login-page/login.component';
import { SigninComponent } from './pages/signin-page/signin.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AdminComponent } from './pages/admin-page/admin.component';

const redirectUnAuthorizedToLogin = () => redirectUnauthorizedTo('/login')
const redirectLoggedInToAdmin = () => redirectLoggedInTo('/admin')

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
  component: FormComponent,
  // 認証してない場合はログインページにリダイレクトするガード
  ...canActivate(redirectUnAuthorizedToLogin),
}, {
  path: 'login',
  component: LoginComponent,
  // 認証済みの場合はアドミンページにリダイレクトするガード
  ...canActivate(redirectLoggedInToAdmin)
}, {
  path: 'signin',
  component: SigninComponent,
  // 認証済みの場合はアドミンページにリダイレクトするガード
  ...canActivate(redirectLoggedInToAdmin)
}, {
  path: 'admin',
  component: AdminComponent,
  // 認証してない場合はログインページにリダイレクトするガード
  ...canActivate(redirectUnAuthorizedToLogin),
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
    KeyboardComponent,
    LoginComponent,
    SigninComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true // ゲームだしSEOいらないのでHashモードでいい気がした
    }),
    StoreModule.forRoot({ [featureName]: managerReducer }),
    EffectsModule.forRoot([ManagerEffects]),
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
