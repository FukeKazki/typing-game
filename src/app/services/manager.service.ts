import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../store/manager.reducer';
import { selectCount, selectMiss, selectProblem, selectScore, selectSuccess, selectVaridity } from '../store/manager.selector';
import * as ManagerActions from '../store/manager.actions'
import data from '../data/problems.json'
import { shuffle } from '../util';
import { map, skip, take } from 'rxjs';

export type Problem = {
  kanji: string;
  hiragana: string;
}
@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  iterator = 0

  constructor(
    private readonly manager: Store<State>
  ) {}

  count$ = this.manager.pipe(select(selectCount))
  score$ = this.manager.pipe(select(selectScore))
  miss$ = this.manager.pipe(select(selectMiss))
  success$ = this.manager.pipe(select(selectSuccess))
  varidity$ = this.manager.pipe(select(selectVaridity))
  problems$ = this.manager.pipe(select(selectProblem))

  async start() {
    this.iterator = 0
    this.manager.dispatch(ManagerActions.start())
  }

  end() {
    this.iterator = 0;
    this.manager.dispatch(ManagerActions.end())
  }

  next() {
    this.iterator++;
    this.manager.dispatch(ManagerActions.next())
  }

  miss() {
    this.manager.dispatch(ManagerActions.miss())
  }

  success() {
    this.manager.dispatch(ManagerActions.success())
  }

  getProblem() {
    return this.problems$.pipe(map(v => v[this.iterator]))
    // return this.problems[this.iterator]
  }

  getNextProblem() {
    return this.problems$.pipe(skip(1), take(1), map(v => v[this.iterator]))
    // return this.problems[this.iterator + 1]
  }

  setProblems(problems: Problem[]) {
    this.manager.dispatch(ManagerActions.setProblem({
      problems: problems
    }))
  }
}
