import { Injectable } from '@angular/core';
import { Category } from '../models/jcms/category';

@Injectable({
  providedIn: 'root'
})
export class CatsHomeMngService {

  private _catsHome: Map<string, Category>;
  private _saveKey: string = "catHomMng_catsHome";

  constructor() {
    const catsTab: Category[] = JSON.parse(sessionStorage.getItem(this._saveKey) || "[]");
    this._catsHome = new Map();
    catsTab.forEach((cat: Category) => {
      this._catsHome.set(cat.url, cat);
    });
  }

  public setAllCats(cats: Category[]): any {
    sessionStorage.setItem(this._saveKey, JSON.stringify(cats));
    cats.forEach((cat: Category) => {
      this._catsHome.set(cat.url, cat);
    });
  }

  public getCatFromUrl(url: string): Category | undefined {
    return this._catsHome.get(url);
  }

  public getCats(): Category[] {
    return Array.from(this._catsHome.values());
  }

  public get catsHome(): Map<string, Category> {
    return this._catsHome;
  }
}
