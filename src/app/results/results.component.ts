import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  constructor(
    private readonly gameService: GameService
  ) { }

  score: number = 0
  count: number = 0

  ngOnInit() {
    this.gameService.score.subscribe(v => {
      this.score = v
    })
    this.gameService.count.subscribe(v => {
      this.count = v
    })
  }

}
