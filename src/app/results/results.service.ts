import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../store/manager.reducer';
import { selectCount, selectScore } from '../store/manager.selector';
import * as ManagerActions from '../store/manager.actions'

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  constructor(
    private readonly manager: Store<State>
  ) { }

  count$ = this.manager.pipe(select(selectCount))
  score$ = this.manager.pipe(select(selectScore))
}
