import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormInput {
  constructor() {}

  public getAllInputCSS() {
    // Input
    const input = document.querySelectorAll('input');
    if (input) {
      input.forEach((i: HTMLInputElement) => {
        if (i.value.length != 0 && i.id) {
          const label = document.querySelector('label[for=' + i.id + ']');
          if (label) label.classList.add('ds44-moveLabel');
        }
      });
    }

    // TextArea
    const textarea = document.querySelectorAll('textarea');
    if (textarea) {
      textarea.forEach((i: HTMLTextAreaElement) => {
        if (i.value.length != 0 && i.id) {
          const label = document.querySelector('label[for=' + i.id + ']');
          if (label) label.classList.add('ds44-moveLabel');
        }
      });
    }
  }
}
