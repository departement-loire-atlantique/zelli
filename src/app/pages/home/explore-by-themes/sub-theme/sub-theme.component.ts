import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Item } from '@/app/components/list/list.component';
import { ArticleASE } from '@/app/models/jcms/articleASE';
import { Category } from '@/app/models/jcms/category';
import { Content } from '@/app/models/jcms/content';
import { SubThemeASE } from '@/app/models/jcms/sousThemeASE';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { Util } from '@/app/util';

import { environment } from '@/environments/environment';

@Component({
  selector: 'app-sub-theme',
  templateUrl: './sub-theme.component.html',
  styleUrls: ['./sub-theme.component.less'],
})
export class SubThemeComponent {
  /**
   * Id de la catégorie theme principale
   */
  idCatTheme: string | null;
  catTheme: Category | undefined;

  /**
   * Id de la catégorie dans la quelle chercher le contenu Sous-thème ASE
   */
  idCatSubTheme: string | null;
  subTheme: SubThemeASE | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _catMng: CatsMngService,
    private _jcms: JcmsClientService
  ) {
    this.idCatTheme = this._route.snapshot.paramMap.get('id');
    if (this.idCatTheme) {
      this._catMng
        .cat(this.idCatTheme)
        .subscribe((cat) => (this.catTheme = cat));
    }

    this.idCatSubTheme = this._route.snapshot.paramMap.get('subId');

    if (this.idCatSubTheme) {
      this._jcms
        .get('search', {
          params: {
            types: 'SousthemeASE',
            exactCat: true,
            cids: this.idCatSubTheme,
          },
        })
        .pipe(map((rep: any): SubThemeASE[] => rep.dataSet))
        .subscribe((rep: SubThemeASE[]) => {
          if (rep && rep.length > 0) {
            this.subTheme = rep[0];

            // get ful content
            for (let i = 0; i < this.subTheme.contenu.length; i++) {
              this._jcms
                .get('data/' + this.subTheme.contenu[i].id)
                .subscribe((fullContent: any) => {
                  if (this.subTheme) {
                    this.subTheme.contenu[i] = fullContent;
                  }
                });
            }
          }
        });
    }
  }

  public getImgContent(content: Content): string | undefined {
    if (content.class === 'generated.ArticleASE') {
      const picto = (content as ArticleASE).picto;
      return picto ? environment.urlJcms + picto : undefined;
    }
    // TODO structures Lot 2
    return undefined;
  }

  public getItemForList(): Item[] {
    let item: Item[] = [];
    if (this.subTheme && this.subTheme.contenu) {
      for (let itContent of this.subTheme.contenu) {
        item.push({
          lbl: itContent.title,
          url: Util.buildUrlCotent(itContent),
          img: this.getImgContent(itContent),
        });
      }
    }
    return item;
  }
}
