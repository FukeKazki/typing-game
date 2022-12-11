import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appButton]',
})
export class ButtonDirective {

  constructor(el: ElementRef) {
    const css = `
      background-color: green;
      padding: 4px 8px;
      border-radius: 8px;
      border: 1px solid green;
      text-decoration: none;
      font-weight: bold;
    `
    el.nativeElement.setAttribute("style", css);
  }

}
