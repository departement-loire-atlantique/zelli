import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapser-item',
  templateUrl: './collapser-element.template.html',
})
export class CollapserElementComponent {
  @Input()
  title: string | undefined;

  constructor() {}
}
