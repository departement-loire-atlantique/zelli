import { Component, Injector, OnInit } from '@angular/core';
import { APageHome } from 'src/app/models/aPageHome';
import { Category } from 'src/app/models/jcms/category';
import { CatsMngService } from 'src/app/services/cats-mng.service';

@Component({
  selector: 'app-explore-by-themes',
  templateUrl: './explore-by-themes.component.html',
  styleUrls: ['./explore-by-themes.component.less'],
})
export class ExploreByThemesComponent extends APageHome implements OnInit {
  themes: Category[];

  constructor(_injector: Injector, private _catMng: CatsMngService) {
    super(_injector);
    this.themes = [];
  }

  ngOnInit(): void {
    if (!this.curentCat) {
      return;
    }

    this._catMng
      .catsChildren(this.curentCat.id)
      .subscribe((cats: Category[]) => {
        this.themes = cats;
      });
  }
}
