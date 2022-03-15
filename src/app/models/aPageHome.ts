import { Directive, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { CatsHomeMngService } from "../services/cats-home-mng.service";
import { Category } from "./category";

@Directive()
export abstract class APageHome {

  protected _router: Router;
  protected _catsHomeMng: CatsHomeMngService

  private _curentCat: Category | undefined;

  constructor(private _injector: Injector) {
    this._router = _injector.get(Router);
    this._catsHomeMng = _injector.get(CatsHomeMngService);

    this.curentCat = this._catsHomeMng.getCatFromUrl(this._router.url)
  }

  public get curentCat(): Category | undefined {
    return this._curentCat;
  }

  protected set curentCat(value: Category | undefined) {
    this._curentCat = value;
  }
}