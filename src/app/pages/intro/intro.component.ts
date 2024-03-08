import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DateService } from 'src/app/services/utils/date.service';

import { Category } from '@/app/models/jcms/category';
import { AppConfigService } from '@/app/services/app-config.service';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.less'],
})
export class IntroComponent implements OnInit {
  private _lastAccess: Date;

  steps: Category[] = [];

  curentStepIndex: number = 0;

  constructor(
    private _router: Router,
    private _dateUtil: DateService,
    private _catMng: CatsMngService,
    private titleService: Title,
    titlePage: TitlePage,
    private appConfigService: AppConfigService
  ) {
    this.titleService.setTitle(titlePage.getTitle('Intro'));
    const strDate = JSON.parse(localStorage.getItem('_lastAccess') || '{}');
    this._lastAccess = new Date(strDate);
  }

  ngOnInit(): void {
    let diffM = -1;

    if (this._dateUtil.testDate(this._lastAccess)) {
      const curentDate = new Date();

      diffM = this._dateUtil.monthDiff(this._lastAccess, curentDate);
    }

    this.updateLastAccess();

    if (0 <= diffM && diffM <= 3) {
      this.end();
      return;
    }

    this._catMng
      .catsChildren(this.appConfigService.config.catIntro)
      .subscribe((cats: Category[]) => {
        this.steps = cats;
      });
  }

  private updateLastAccess() {
    localStorage.setItem('_lastAccess', JSON.stringify(new Date()));
  }

  public next() {
    // TODO Focus for accessibility
    this.curentStepIndex++;
    if (this.curentStepIndex >= this.steps.length) {
      this.end();
    }
  }

  public end() {
    this._router.navigate(['/themes']);
  }
}
