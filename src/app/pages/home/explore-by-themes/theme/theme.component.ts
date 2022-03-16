import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.less']
})
export class ThemeComponent implements OnInit {

  @Input()
  curentCat: Category | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
