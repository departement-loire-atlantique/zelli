import { Component, Input } from '@angular/core';

import { Category } from '@/app/models/jcms/category';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.less'],
})
export class PageTitleComponent {
  @Input()
  curentCat: Category | undefined;

  constructor() {}
}
