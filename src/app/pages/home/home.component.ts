import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Category } from 'src/app/models/jcms/category';
import { CatsHomeMngService } from 'src/app/services/cats-home-mng.service';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { LabelMngService } from 'src/app/services/label-mng.service';

import { AppConfigService } from '@/app/services/app-config.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  /**
   * true if app is init
   */
  private _appInit: boolean = false;

  /**
   * url du logo
   */
  logoUrl: string = '';

  constructor(
    private _router: Router,
    private _jcms: JcmsClientService,
    private _catMng: CatsMngService,
    private _catHomeMng: CatsHomeMngService,
    private _lblMng: LabelMngService,
    private titleService: Title,
    titlePage: TitlePage,
    private appConfigService: AppConfigService
  ) {
    this.titleService.setTitle(titlePage.getTitle('Home'));
    this._appInit = JSON.parse(sessionStorage.getItem('_appInit') || 'false');

    this.logoUrl = JSON.parse(
      sessionStorage.getItem('logoUrl') || '"assets/images/svg/logo-zelli.svg"'
    );
  }

  ngOnInit(): void {
    if (!this._appInit) {
      // init
      let allObs: any = {};

      // Logo
      allObs.logo = this._jcms.get(
        'plugins/zelli/prop/jcmsplugin.zelli.logo.app'
      );
      allObs.logo.subscribe((rep: any) => {
        this.logoUrl = rep.value;
        sessionStorage.setItem('logoUrl', JSON.stringify(this.logoUrl));
      });

      // catsHom
      const catsHom: Observable<Category[]> = this._catMng.catsChildren(
        this.appConfigService.config.catNavMain
      );
      allObs.catsHom = catsHom;
      catsHom.subscribe(); // pre run

      // lbl
      const lbl: any = this._lblMng.obsLbls;
      allObs = Object.assign({}, allObs, lbl);

      setTimeout(() => {
        // wait all obs
        combineLatest(allObs).subscribe((rep: any) => {
          // ----- Logo

          // ----- catsHom
          const cats: Category[] = rep.catsHom;

          this._catHomeMng.setAllCats(cats);

          // ----- lbls

          // end init
          this._appInit = true;
          sessionStorage.setItem('_appInit', JSON.stringify(this._appInit));

          // redirect
          this._router.navigate(['/welcome']);
        });
      }, 5000);
    } else {
      this._router.navigate(['/welcome']);
    }
  }

  public get appInit(): boolean {
    return this._appInit;
  }

  public getLblBaseline(): string {
    return this._lblMng.lblBaseline();
  }
}
