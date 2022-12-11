import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HiraganaParser } from 'hiragana-parser'
import { interval, map, take } from 'rxjs';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit {
  parser: HiraganaParser | undefined

  kanji: string = ''
  inputed: string = ''
  notInputed: string = ''
  inputedHiragana: string = ''
  notInputedHiragana: string = ''

  miss$ = this.managerService.miss$

  // 残り時間
  timer = 100

  constructor(
    private readonly managerService: ManagerService,
    private readonly router: Router
  ) { }

  get nextProblem() {
    return this.managerService.getNextProblem()
  }


  ngOnInit(): void {
    this.start()
  }

  /**
   * ゲーム開始
   */
  private start(): void {
    this.managerService.start()
    const { kanji, hiragana } = this.managerService.getProblem()
    this.kanji = kanji
    this.parser = new HiraganaParser({ hiraganas: hiragana })
    this.notInputed = this.parser.notInputedRoma
    this.notInputedHiragana = this.parser.notInputedHiragana

    this.startTimer()
  }

  /**
   * タイマーを起動する
   */
  private startTimer(): void {
    const start = 100
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

  /**
   * キーを入力した時
   */
  @HostListener('window:keydown',['$event'])
  private onKeyDown(event: KeyboardEvent) {
    const key = event.key
    const isOk = this.parser?.input(key)
    this.inputed = this.parser?.inputedRoma ?? ''
    this.notInputed = this.parser?.notInputedRoma ?? ''

    this.inputedHiragana = this.parser?.inputedHiragana ?? ''
    this.notInputedHiragana = this.parser?.notInputedHiragana ?? ''

    if (isOk) {
      this.managerService.success()
    }
    else {
      this.managerService.miss()
    }
    if (this.parser?.isComplete()) {
      this.complete()
    }
  }

  /**
   * 全て入力した時
   * 次の問題に行く
   */
  private complete(): void {
    this.managerService.next()
    const { kanji, hiragana } = this.managerService.getProblem()
    this.kanji = kanji
    this.parser = new HiraganaParser({ hiraganas: hiragana })
    this.notInputed = this.parser.notInputedRoma
    this.notInputedHiragana = this.parser.notInputedHiragana

    this.inputed = ''
    this.inputedHiragana = ''
  }

  /**
   * タイマーが終了した時
   */
  private finished(): void {
    this.managerService.end()
    this.router.navigateByUrl('/results', { replaceUrl: true })
  }
}
