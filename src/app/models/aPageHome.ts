import { Directive, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { CatsHomeMngService } from '../services/cats-home-mng.service';
import { Category } from './jcms/category';

@Directive()
export abstract class APageHome {
  protected _router: Router;
  protected _catsHomeMng: CatsHomeMngService;

  private _curentCat: Category | undefined;

  error: boolean = false;

  constructor(private _injector: Injector) {
    this._router = _injector.get(Router);
    this._catsHomeMng = _injector.get(CatsHomeMngService);

    this.curentCat = this._catsHomeMng.getCatFromUrl(this._router.url);

    if (!this.curentCat) {
      console.error('curent cat is undefined');
      this.error = true;
      return;
    }
  }

  public get curentCat(): Category | undefined {
    return this._curentCat;
  }

  protected set curentCat(value: Category | undefined) {
    this._curentCat = value;
  }
}
