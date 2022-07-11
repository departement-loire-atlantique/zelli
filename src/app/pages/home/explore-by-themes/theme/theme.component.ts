import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Item } from '@/app/components/list/list.component';
import { Category } from '@/app/models/jcms/category';
import { Content } from '@/app/models/jcms/content';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { Util } from '@/app/util';

import { environment } from '@/environments/environment';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.less'],
})
export class ThemeComponent {
  curentCat: Category | undefined;
  subThemes: Category[] | undefined;
  result: Item[] | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _catMng: CatsMngService,
    public lblMng: LabelMngService,
    private _jcms: JcmsClientService
  ) {
    const id = this._route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this._catMng.cat(id).subscribe((cat) => (this.curentCat = cat));
    this._catMng.catsChildren(id).subscribe((cats) => {
      this.subThemes = cats;
      this.result = this.getItemForList();
      for (let c in cats) {
        this.setListItem(cats[c], c);
      }
    });
  }

  public setListItem(subTheme: Category, ind: string) {
    this._jcms
      .get('search', {
        params: {
          exactCat: true,
          catMode: 'and',
          cids: [subTheme.id, environment.catMainContent],
        },
      })
      .pipe(map((rep: any): Content[] => rep.dataSet))
      .subscribe((contents: Content[]) => {
        if (!this.result) {
          this.result = [];
        }

        let isSubTheme = false;
        let firstContent = undefined;

        for (let contenu of contents) {
          if (!firstContent) firstContent = contenu;
          if (contenu.class == 'generated.SousthemeASE') {
            isSubTheme = true;
            break;
          }
        }

        if (isSubTheme) {
          this.result.splice(Number(ind), 1, {
            lbl: subTheme.title,
            url: '/subTheme/fromCat/' + subTheme.id,
          });
        } else if (firstContent) {
          this.result.splice(Number(ind), 1, {
            lbl: subTheme.title, // conservation du titre de la cat
            url: Util.buildUrlCotent(firstContent),
          });
        }
      });
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
