import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/jcms/category';

@Component({
  selector: 'app-theme-header',
  templateUrl: './theme-header.component.html',
  styleUrls: ['./theme-header.component.less']
})
export class ThemeHeaderComponent implements OnInit {

  @Input()
  catTheme: Category | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
