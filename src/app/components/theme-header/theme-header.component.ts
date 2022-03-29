import { Component, Input } from '@angular/core';

import { Category } from '@/app/models/jcms/category';

@Component({
  selector: 'app-theme-header',
  templateUrl: './theme-header.component.html',
  styleUrls: ['./theme-header.component.less'],
})
export class ThemeHeaderComponent {
  @Input()
  catTheme: Category | undefined;

  @Input()
  big: boolean = true;

  constructor() {}
}
