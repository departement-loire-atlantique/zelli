import { Component, Injector, OnInit } from '@angular/core';
import { APageHome } from 'src/app/models/aPageHome';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-explore-by-themes',
  templateUrl: './explore-by-themes.component.html',
  styleUrls: ['./explore-by-themes.component.less']
})
export class ExploreByThemesComponent extends APageHome implements OnInit {

  themes: Category[];

  constructor(_injector: Injector) {
    super(_injector);
    this.themes = [];
  }

  ngOnInit(): void {
  }

}
