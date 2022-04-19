import { Component, Input } from '@angular/core';

export type HeadingProps = {
  noBold?: boolean;
};

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.less'],
})
export class HeadingComponent {
  @Input()
  icon?: string;

  @Input()
  options?: HeadingProps = {
    noBold: false,
  };
}
