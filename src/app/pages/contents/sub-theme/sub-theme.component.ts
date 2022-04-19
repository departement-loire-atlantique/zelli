import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class SubThemeComponent implements OnInit {
  /**
   * Id de la catégorie dans la quelle chercher le contenu Sous-thème ASE
   */
  subTheme: SubThemeASE | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _catMng: CatsMngService,
    private _jcms: JcmsClientService
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this._route.data.subscribe((data) => {
          if (data['isIdCat']) {
            this.initSubThemeFromCat(idParam);
          } else {
            this.initSubThemeFromId(idParam);
          }
        });
      }
    });
  }

  private initSubThemeFromCat(idCat: string) {
    this._jcms
      .get('search', {
        params: {
          types: 'SousthemeASE',
          exactCat: true,
          cids: idCat,
        },
      })
      .pipe(map((rep: any): SubThemeASE[] => rep.dataSet))
      .subscribe((rep: SubThemeASE[]) => {
        if (rep && rep.length > 0) {
          this.initSubTheme(rep[0]);
        } else {
          this.displayErrorNotFound();
        }
      });
  }

  private initSubThemeFromId(id: string) {
    this._jcms
      .get<SubThemeASE>('data/' + id)
      .subscribe((subTheme: SubThemeASE) => {
        this.initSubTheme(subTheme);
      });
  }

  private initSubTheme(subTheme: SubThemeASE | undefined) {
    if (subTheme) {
      // TODO bug jalios
      subTheme.navigation = (subTheme as any).categories[0];

      this.subTheme = subTheme;

      if (subTheme.navigation) {
        // OPTI ?
        this._catMng.cat(subTheme.navigation.id).subscribe((cat) => {
          if (cat.parent) {
            this._catMng.cat(cat.parent).subscribe((catParent) => {
              subTheme.navigation = catParent;
            });
          }
        });
      }

      // get full content
      for (let i = 0; i < this.subTheme.contenu.length; i++) {
        this._jcms
          .get('data/' + this.subTheme.contenu[i].id)
          .subscribe((fullContent: any) => {
            if (this.subTheme) {
              this.subTheme.contenu[i] = fullContent;
            }
          });
      }
    } else {
      this.displayErrorNotFound();
    }
  }

  private displayErrorNotFound() {
    this._router.navigateByUrl('**', { skipLocationChange: true });
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
