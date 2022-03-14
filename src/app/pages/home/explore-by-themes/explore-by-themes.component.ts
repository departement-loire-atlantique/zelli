import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-explore-by-themes',
  templateUrl: './explore-by-themes.component.html',
  styleUrls: ['./explore-by-themes.component.less']
})
export class ExploreByThemesComponent implements OnInit {

  themes: Category[];

  constructor() {
    this.themes = [];
  }

  ngOnInit(): void {
  }

}
