import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../store/manager.reducer';
import { selectCount, selectScore } from '../store/manager.selector';
import * as ManagerActions from '../store/manager.actions'
import data from '../data/problems.json'

const random = (max: number) => {
  return Math.floor((Math.random() * max))
}

@Injectable({
  providedIn: 'root'
})
export class PlayingService {
  constructor(
    private readonly manager: Store<State>
  ) { }

  count$ = this.manager.pipe(select(selectCount))
  score$ = this.manager.pipe(select(selectScore))

  start() {
    this.manager.dispatch(ManagerActions.start())
    return this.generate()
  }

  end() {
    this.manager.dispatch(ManagerActions.end())
  }

  next() {
    this.manager.dispatch(ManagerActions.next())
    return this.generate()
  }

  private generate() {
    return data.problems[random(data.problems.length)]
  }
}
