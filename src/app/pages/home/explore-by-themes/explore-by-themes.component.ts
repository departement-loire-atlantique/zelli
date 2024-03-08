import { Component, Injector, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APageHome } from 'src/app/models/aPageHome';
import { Category } from 'src/app/models/jcms/category';
import { CatsHomeMngService } from 'src/app/services/cats-home-mng.service';
import { CatsMngService } from 'src/app/services/cats-mng.service';

import { AppConfigService } from '@/app/services/app-config.service';
import { DateService } from '@/app/services/utils/date.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

@Component({
  selector: 'app-explore-by-themes',
  templateUrl: './explore-by-themes.component.html',
  styleUrls: ['./explore-by-themes.component.less'],
})
export class ExploreByThemesComponent extends APageHome implements OnInit {
  themes: Category[];
  lastUpdateDateKey: string = '_lastUpdateCat';

  constructor(
    _injector: Injector,
    private _catMng: CatsMngService,
    private _catHomeMng: CatsHomeMngService,
    private _dateUtil: DateService,
    private titleService: Title,
    titlePage: TitlePage,
    private appConfigService: AppConfigService
  ) {
    super(_injector);
    this.titleService.setTitle(titlePage.getTitle('Explorer par thèmes'));
    this.themes = [];
  }

  ngOnInit(): void {
    if (!this.curentCat) {
      return;
    }

    //themes
    this._catMng
      .catsChildren(this.curentCat.id)
      .subscribe((cats: Category[]) => {
        this.themes = cats;
      });

    //cat menu
    let dateToday = new Date(Date.now());
    let dateSaved = localStorage.getItem(this.lastUpdateDateKey);
    if (dateSaved) {
      if (this._dateUtil.dayDiff(dateToday, new Date(dateSaved)) > 7) {
        //si diff > 7 jours on update les cats
        localStorage.setItem(this.lastUpdateDateKey, dateToday.toString());
        this.updateHomeCat();
      }
    } else {
      localStorage.setItem(this.lastUpdateDateKey, dateToday.toString());
      this.updateHomeCat();
    }
  }

  private updateHomeCat() {
    this._catMng
      .catsChildren(this.appConfigService.config.catNavMain)
      .subscribe((res: Category[]) => {
        this._catHomeMng.setAllCats(res);
      });
  }
}
