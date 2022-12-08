import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

type State = 'INIT' | 'PLAYING' | 'FINISHED'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // ゲームが始まってるかどうか
  state = new BehaviorSubject<State>('INIT')

  // スコア
  score = new BehaviorSubject<number>(0)

  // 問題数
  count = new BehaviorSubject<number>(0)

  constructor(
    private readonly router: Router
  ) {
    this.state.subscribe(v => {
      if (v === 'PLAYING') {
        this.router.navigateByUrl('/playing')
      }
      if (v === 'FINISHED') {
        this.router.navigateByUrl('/results')
      }
      if (v === 'INIT') {
        this.router.navigateByUrl('/')
      }
    })
  }

  nextProblem(): void {
    this.count.next(this.count.value + 1)
    this.calcScore()
  }

  private calcScore(): void {
    this.score.next(this.score.value + 10)
  }
}
