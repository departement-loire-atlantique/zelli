import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CatHomeItem } from '../models/cat-home-item';
import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root'
})
export class CatHomeMngService {

  private _catsHome: Observable<CatHomeItem[]>;
  /**
   * Map url => CatHomeItem
   */
  private _catHomeMap: Map<string, CatHomeItem> = new Map();

  constructor(private _jcms: JcmsClientService) {
    if (!environment.production) {
      console.log('init CatHomeMngService');
    }

    this._catsHome = this.catFromServ();
    this._catsHome.subscribe((cats: CatHomeItem[]) => {
      cats.forEach(itCat => this._catHomeMap.set(itCat.url, itCat));
    }
    );
  }

  private catFromServ(): Observable<CatHomeItem[]> {
    this._catHomeMap = new Map();
    return this._jcms.get<CatHomeItem[]>("data/children/{id}")// TODO custom rest service
      .pipe(
        // ex rep voir /src/mock/catHome.json
        map((rep: any) => rep.dataSet.map((itData: any) => {
          return {
            title: itData.name,
            smallTitle: itData.synonyms ? itData.synonyms[0] : itData.name,
            subTitle: itData.description,
            icon: itData.icon,
            url: itData.friendlyURLSet ? itData.friendlyURLSet[0] : ""
          };
        }))
      );
  }

  public getCatFromUrl(url: string): CatHomeItem | undefined {
    return this._catHomeMap.get(url);
  }

  public get catsHome(): Observable<CatHomeItem[]> {
    return this._catsHome;
  }

  public get catHomeMap(): Map<string, CatHomeItem> {
    return this._catHomeMap;
  }

}
