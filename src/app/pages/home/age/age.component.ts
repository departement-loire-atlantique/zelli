import { Component, Injector, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { Item } from '@/app/components/list/list.component';
import { APageHome } from '@/app/models/aPageHome';
import { Category } from '@/app/models/jcms/category';
import { Content } from '@/app/models/jcms/content';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { Util } from '@/app/util';

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.less'],
})
export class AgeComponent extends APageHome implements OnInit {
  ages: Category[];
  titleCollaps: string[];
  itemsCollaps: Item[][];

  constructor(
    _injector: Injector,
    private _catMng: CatsMngService,
    private _jcms: JcmsClientService
  ) {
    super(_injector);
    this.ages = [];
    this.titleCollaps = [];
    this.itemsCollaps = [];
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
              for (let itSubCat of subCats) {
                // get fist content
                this._jcms
                  .get('search', {
                    params: {
                      types: 'Content',
                      exactCat: true,
                      cids: itSubCat.id,
                      pageSize: 1,
                    },
                  })
                  .pipe(map((rep: any): Content[] => rep.dataSet))
                  .subscribe((contents: Content[]) => {
                    items.push({
                      lbl: itSubCat.title,
                      img: itSubCat.image,
                      url:
                        contents && contents.length > 0
                          ? Util.buildUrlCotent(contents[0])
                          : '',
                    });
                  });
              }
            });
          this.itemsCollaps.push(items);
        }
      });
  }
}
