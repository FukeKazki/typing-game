import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  constructor(
    private readonly managerService: ManagerService
  ) { }

  score$ = this.managerService.score$
  count$ = this.managerService.count$
  miss$ = this.managerService.miss$
  success$ = this.managerService.success$
  varidity$ = this.managerService.varidity$

  ngOnInit() {
  }

}
