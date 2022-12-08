import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent {
  constructor(
    private readonly gameService: GameService
  ) { }

  start() {
    this.gameService.state.next('PLAYING')
  }
}
