import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root'
})
export class CatHomeMngService {

  private _catsHome: Observable<Category[]>;
  /**
   * Map url => CatHomeItem
   */
  private _catHomeMap: Map<string, Category> = new Map();

  constructor(private _jcms: JcmsClientService) {
    if (!environment.production) {
      console.log('init CatHomeMngService');
    }

    this._catsHome = this.catFromServ();
    this._catsHome.subscribe((cats: Category[]) => {
      cats.forEach(itCat => this._catHomeMap.set(itCat.url, itCat));
    }
    );
  }

  private catFromServ(): Observable<Category[]> {
    this._catHomeMap = new Map();
    return this._jcms.get<Category[]>("data/children/{id}")// TODO custom rest service
      .pipe(
        // ex rep voir /src/mock/catHome.json
        map((rep: any) => rep.dataSet.map((itData: any): Category => {
          return new Category({
            title: itData.name,
            smallTitle: itData.synonyms ? itData.synonyms[0] : itData.name,
            subTitle: itData.description,
            icon: itData.icon,
            url: itData.friendlyURLSet ? itData.friendlyURLSet[0] : ""
          });
        }))
      );
  }

  public getCatFromUrl(url: string): Category | undefined {
    return this._catHomeMap.get(url);
  }

  public get catsHome(): Observable<Category[]> {
    return this._catsHome;
  }

  public get catHomeMap(): Map<string, Category> {
    return this._catHomeMap;
  }

}
