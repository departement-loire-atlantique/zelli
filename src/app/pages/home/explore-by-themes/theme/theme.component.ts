import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from '@/app/components/list/list.component';
import { Category } from '@/app/models/jcms/category';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { LabelMngService } from '@/app/services/label-mng.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.less'],
})
export class ThemeComponent {
  curentCat: Category | undefined;
  subThemes: Category[] | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _catMng: CatsMngService,
    public lblMng: LabelMngService
  ) {
    const id = this._route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this._catMng.cat(id).subscribe((cat) => (this.curentCat = cat));
    this._catMng.catsChildren(id).subscribe((cats) => (this.subThemes = cats));
  }

  public getItemForList(): Item[] {
    let item: Item[] = [];
    if (this.subThemes) {
      for (let itSubT of this.subThemes) {
        item.push({
          lbl: itSubT.title,
          url: '/subTheme/fromCat/' + itSubT.id,
        });
      }
    }
    return item;
  }
}
