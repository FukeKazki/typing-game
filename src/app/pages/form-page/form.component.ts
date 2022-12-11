import { Component } from "@angular/core";
import { FormArray, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  constructor(
    private fb: FormBuilder
  ) { }

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

  onSubmit(): void {
    console.log(this.problemForm.value)
  }
}
