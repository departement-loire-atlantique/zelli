import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-next-link',
  templateUrl: './next-link.component.html',
  styleUrls: ['./next-link.component.less'],
})
export class NextLinkComponent {
  @Input()
  title = 'Page suivante';

  @Input()
  description?: string;

  @Input()
  link?: string | string[];
}
