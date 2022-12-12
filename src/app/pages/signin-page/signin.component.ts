import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) { }

  signIn(form: NgForm): void {
    const { email, password } = form.value;
    this.authService.signIn(email, password)
      .then(({ user }) => {
        // ユーザー作成時のuidをキーにドキュメントを作成する
        return this.userService.createUser(user)
      })
      .then(() => this.router.navigateByUrl('/admin'))
      .catch((error) => alert(error));
  }
}
