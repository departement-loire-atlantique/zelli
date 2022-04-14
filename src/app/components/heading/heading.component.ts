import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.less'],
})
export class HeadingComponent {
  @Input()
  icon?: string;
}
