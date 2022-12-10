import { Component, OnInit } from '@angular/core';
import { ResultsService } from './results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  constructor(
    private readonly resultsService: ResultsService
  ) { }

  score$ = this.resultsService.score$
  count$ = this.resultsService.count$

  ngOnInit() {
  }

}
