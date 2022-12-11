import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ManagerService } from '../services/manager.service';
import { end } from './manager.actions';
import { State } from './manager.reducer';
import * as ManagerActions from '../store/manager.actions'

@Injectable()
export class ManagerEffects {
  constructor(
    private actions$: Actions,
    private manager: ManagerService,
    private readonly store: Store<State>
  ) { }

  saveScore$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(end),
        tap(() =>
          this.store.dispatch(ManagerActions.calcScore())
        ),
        mergeMap(() =>
          this.manager.score$.pipe(
            map(score => {
              window.localStorage.setItem('score', JSON.stringify(score)) // 前回のスコアをローカルストーレジにとりあえずいれとく
            })
          )
        )
      ), {
        dispatch: false
      }
  );
}
