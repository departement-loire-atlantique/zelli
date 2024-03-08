import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Item } from '@/app/components/list/list.component';
import { Category } from '@/app/models/jcms/category';
import { Content } from '@/app/models/jcms/content';
import { Redirection } from '@/app/models/jcms/redirection';
import { AppConfigService } from '@/app/services/app-config.service';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { TitlePage } from '@/app/services/utils/title-page.service';
import { Util } from '@/app/util';

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
    private _jcms: JcmsClientService,
    private titleService: Title,
    titlePage: TitlePage,
    private appConfigService: AppConfigService
  ) {
    this.titleService.setTitle(titlePage.getTitle('Thème'));
    const id = this._route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    //current cat du thème
    this._catMng.cat(id).subscribe((cat) => (this.curentCat = cat));

    //liste des catégories de sous thèmes
    this._catMng.catsChildren(id).subscribe((cats) => {
      this.subThemes = cats;
      this.result = this.getItemForList();
      for (let c in cats) {
        this.setListItem(cats[c], Number(c));
      }
    });
  }

  /**
   * Cherche les sous contenus de la catégorie et redirige en fonction du type de contenu
   * @param subTheme catégorie sous thème
   * @param ind indice de la catégorie dans la liste de sous-thèmes
   */
  public setListItem(subTheme: Category, ind: number) {
    //liste les contenus du sous thème
    this._jcms
      .get('search', {
        params: {
          types: ['PortletPortalRedirect', 'ArticleASE', 'SousthemeASE'],
          exactCat: true,
          catMode: 'and',
          cids: [subTheme.id, this.appConfigService.config.catMainContent], //sous la catégorie "Explorer par thèmes" et sous "mise en avant > contenu principal"
        },
      })
      .pipe(map((rep: any): Content[] => rep.dataSet))
      .subscribe((contents: Content[]) => {
        if (!this.result) {
          this.result = [];
        }

        let isSubTheme = false;
        let redirect = undefined;
        let article = undefined;

        for (let contenu of contents) {
          if (contenu.class == 'generated.ArticleASE' && !article) {
            //on cherche s'il existe un article
            article = contenu;
          } else if (contenu.class == 'generated.PortletPortalRedirect') {
            //on cherche s'il existe une redirection
            redirect = contenu as Redirection;
            break;
          } else if (contenu.class == 'generated.SousthemeASE') {
            //on cherche s'il existe un sous-theme
            isSubTheme = true;
            break;
          }
        }

        if (isSubTheme) {
          //item qui redirige vers sous thème
          this.result[ind] = {
            lbl: subTheme.title,
            url: '/subTheme/fromCat/' + subTheme.id,
          };
        } else if (redirect) {
          //item qui redirige vers une autre rubrique
          switch (redirect.status) {
            case 'category':
              this.result[ind] = {
                lbl: subTheme.title,
                url: '/subTheme/fromCat/' + redirect.category,
              };
              break;

            case 'content':
              this.result[ind] = {
                lbl: subTheme.title,
                url: Util.buildUrlCotent(redirect.content),
              };
              break;
          }
        } else if (article) {
          //item redirige vers article
          this.result[ind] = {
            lbl: subTheme.title, // conservation du titre de la cat
            url: Util.buildUrlCotent(article),
          };
        }
      });
  }

  /**
   * Catégories vers items pour la liste des sous-thèmes
   * @returns liste d'items
   */
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

  public getResult() {
    return this.result;
  }
}
