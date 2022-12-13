import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ManagerService, Problem } from 'src/app/services/manager.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {
  constructor(
    private postService: PostService,
    private manager: ManagerService,
    private router: Router
  ) { }

  games: DocumentData[] = []

  selectedIndex: number = 0

  async ngOnInit() {

    this.games = await this.postService.getProblems()
    this.manager.setProblems(this.games[0]['problems'] as any)
  }

  select(game: any, i: number) {
    this.selectedIndex = i
    this.manager.setProblems(game)
  }

  start() {
    this.router.navigateByUrl('/playing')
  }
}
