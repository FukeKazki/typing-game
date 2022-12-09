import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { HiraganaParser, hiraganaToRomas } from 'hiragana-parser'
import { interval, map, take } from 'rxjs';
import data from '../data/problems.json'
import { Subscription } from 'rxjs';

const random = (max: number) => {
  return Math.floor((Math.random() * max))
}

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit, OnDestroy {

  count: number = 0

  score: number = 0
  // typingするひらがな
  typing: string = ''
  kanji: string = ''

  collects: string[] = []

  parser: HiraganaParser | undefined

  inputed: string = ''
  notInputed: string = ''

  inputedHiragana: string = ''
  notInputedHiragana: string = ''

  subscription = new Subscription()

  // 残り時間
  timer = 30

  constructor(
    private readonly gameService: GameService
  ) {}

  ngOnInit(): void {
    this.generate()
    this.subscription.add(
      this.gameService.score.subscribe(score => {
        this.score = score
      })
    )
    this.subscription.add(
      this.gameService.count.subscribe(count => {
        this.count = count
      })
    )
    this.start()
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

  private start(): void {
    const start = 30
    const timer = interval(1000)
    timer.pipe(
      take(start),
      map(v => start - v - 1)
    ).subscribe(v => {
      this.timer = v
      if (v === 0) {
        this.finished()
      }
    })
  }

  private generate(): void {
    const problem = data.problems[random(data.problems.length)]
    this.typing = problem.hiragana
    this.kanji = problem.kanji
    this.parser = new HiraganaParser({ hiraganas: problem.hiragana })
    this.collects = hiraganaToRomas(problem.hiragana)
    this.notInputed = this.parser.notInputedRoma
    this.notInputedHiragana = this.parser.notInputedHiragana
  }

  @HostListener('window:keydown',['$event'])
  private onKeyDown(event: KeyboardEvent) {
    const key = event.key
    this.parser?.input(key)
    this.inputed = this.parser?.inputedRoma ?? ''
    this.notInputed = this.parser?.notInputedRoma ?? ''

    this.inputedHiragana = this.parser?.inputedHiragana ?? ''
    this.notInputedHiragana = this.parser?.notInputedHiragana ?? ''

    if (this.parser?.isComplete()) {
      this.complete()
    }
  }

  private complete(): void {
    this.gameService.nextProblem(this.inputed)
    this.inputed = ''
    this.notInputed = ''
    this.inputedHiragana = ''
    this.notInputedHiragana = ''
    this.generate()
  }

  private finished(): void {
    this.gameService.state.next('FINISHED')
  }
}
