import { Component, OnInit } from "@angular/core";
import { User } from "@angular/fire/auth";
import { FormArray, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";
import { UserService } from "src/app/services/user.service";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  user: User | null = null

  constructor(
    private readonly auth: AuthService,
    private fb: FormBuilder,
    private postService: PostService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.auth.getAuthState().subscribe(user => this.user = user)
  }

  problemForm = this.fb.group({
    title: [''],
    problems: this.fb.array([
      this.fb.group({
        hiragana: this.fb.control('さいとうあすか'),
        kanji: this.fb.control('齋藤飛鳥')
      })
    ])
  })

  get problems() {
    return this.problemForm.get('problems') as FormArray
  }

  addProblem() {
    this.problems.push(
      this.fb.group({
        hiragana: this.fb.control(''),
        kanji: this.fb.control('')
      })
    )
  }

  async onSubmit(): Promise<void> {
    if (!this.user) return;
    const user = await this.userService.getAccount(this.user.uid)
    this.postService.post({
      ...this.problemForm.value,
      user: user?.ref
    })
    window.alert('投稿しました！')
  }
}
