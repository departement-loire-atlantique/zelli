import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.less']
})
export class PageTitleComponent implements OnInit {

  @Input()
  curentCat: Category | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
