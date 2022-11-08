import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-has-helped',
  templateUrl: './has-helped.component.html',
  styleUrls: ['./has-helped.component.less'],
})
export class HasHelpedComponent {
  @Input()
  contentId: string | undefined;

  clicked = false;
  css1 = '';
  css2 = '';
  //TODO Google tag

  constructor() {}

  actionMethod(state: number) {
    switch (state) {
      case 1:
        this.css1 = 'active';
        break;
      case 2:
        this.css2 = 'active';
        break;
      default:
        this.css1 = '';
        this.css2 = '';
        break;
    }
  }
}
