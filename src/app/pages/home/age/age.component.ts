import { Component, Injector, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs';

import { Item } from '@/app/components/list/list.component';
import { APageHome } from '@/app/models/aPageHome';
import { Category } from '@/app/models/jcms/category';
import { Content } from '@/app/models/jcms/content';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { TitlePage } from '@/app/services/utils/title-page.service';
import { Util } from '@/app/util';

import { environment } from '@/environments/environment';

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.less'],
})
export class AgeComponent extends APageHome implements OnInit {
  ages: Category[];

  titleCollaps: string[];

  itemsCollaps: Item[][];

  loading: boolean;

  constructor(
    _injector: Injector,
    private _catMng: CatsMngService,
    private _jcms: JcmsClientService,
    private titleService: Title,
    titlePage: TitlePage
  ) {
    super(_injector);
    this.titleService.setTitle(titlePage.getTitle('A chaque âge'));
    this.ages = [];
    this.titleCollaps = [];
    this.itemsCollaps = [];
    this.loading = true;
  }

  ngOnInit(): void {
    if (!this.curentCat) {
      return;
    }

    this._catMng
      .catsChildren(this.curentCat.id)
      .subscribe((cats: Category[]) => {
        this.ages = cats;
        for (let itCat of this.ages) {
          this.titleCollaps.push(itCat.title);

          // get sub cats
          const items: Item[] = [];
          this._catMng
            .catsChildren(itCat.id)
            .subscribe((subCats: Category[]) => {
              // /!\ Le fonctionnement avec i et l'init de "items" est là pour conserver l'ordre d'affichage BO => FO
              for (let i = 0; i < subCats.length; i++) {
                let itSubCat = subCats[i];

                // array init with empty item
                items.push({ lbl: '' });

                // get fist content
                this._jcms
                  .get('search', {
                    params: {
                      types: 'Content',
                      exactCat: true,
                      catMode: 'and',
                      cids: [itSubCat.id, environment.catMainContent],
                      pageSize: 1,
                    },
                  })
                  .pipe(map((rep: any): Content[] => rep.dataSet))
                  .subscribe((contents: Content[]) => {
                    items[i] = {
                      lbl: itSubCat.title,
                      img: itSubCat.image,
                      url:
                        contents && contents.length > 0
                          ? Util.buildUrlCotent(contents[0])
                          : '',
                    };
                  });
              }
            });

          this.itemsCollaps.push(items);
        }
        this.loading = false;
      });
  }
}
