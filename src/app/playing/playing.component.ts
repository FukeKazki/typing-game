import { Component, HostListener, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { GameParser, hiraganaToRomas } from 'hiragana-parser'
import { interval, map, take } from 'rxjs';

const PROBLEMS = ['さいとうあすかです', 'おれのおんなになれ']

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit {

  count: number = 0

  score: number = 0
  // typingするひらがな
  typing: string = ''

  collects: string[] = []

  parser: GameParser | undefined

  inputed: string = ''
  notInputed: string = ''

  timer = 0

  constructor(
    private readonly gameService: GameService
  ) {}

  ngOnInit(): void {
    this.generate()
    this.gameService.score.subscribe(score => {
      this.score = score
    })
    this.gameService.count.subscribe(count => {
      this.count = count
    })
    const start = 30
    const timer = interval(1000)
    timer.pipe(
      take(start),
      map(v => start - v)
    ).subscribe(v => {
      console.log(v)
      this.timer = v
    })
  }

  private generate(): void {
    const problem = PROBLEMS[this.count]
    this.typing = problem
    this.parser = new GameParser({ hiraganas: problem })
    this.collects = hiraganaToRomas(problem)
    this.notInputed = this.parser.notInputedRoma
  }

  @HostListener('window:keydown',['$event'])
  onKeyUp(event: KeyboardEvent) {
    const key = event.key
    this.parser?.input(key)
    this.inputed = this.parser?.inputedRoma ?? ''
    this.notInputed = this.parser?.notInputedRoma ?? ''

    if (this.parser?.isComplete()) {
      this.complete()
    }
  }

  private complete(): void {
    this.gameService.nextProblem()
    this.inputed = ''
    this.notInputed = ''
    this.generate()
  }

  private finished(): void {
    this.gameService.state.next('FINISHED')
  }
}
