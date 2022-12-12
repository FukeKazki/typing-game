import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  user: User | null = null

  constructor(
    private readonly auth: AuthService
  ){}

  ngOnInit(): void {
    this.auth.getAuthState().subscribe(user => this.user = user)
  }
}
