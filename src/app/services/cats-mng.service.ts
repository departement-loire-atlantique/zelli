import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root'
})
export class CatsMngService {

  constructor(private _jcms: JcmsClientService) {
  }

  /**
   * 
   * @param idCat 
   * @returns Retourne les categories enfant
   */
  public catsChildren(idCat: string): Observable<Category[]> {
    return this._jcms.get<Category[]>("data/children/" + idCat)
      .pipe(
        // ex rep voir /src/mock/cat/catHome.json
        map((rep: any) => rep.dataSet.map((itData: any): Category => {
          return new Category({
            id: itData.id,
            title: itData.name,
            smallTitle: itData.synonyms ? itData.synonyms[0] : itData.name,
            subTitle: itData.description,
            icon: itData.icon,
            image: itData.image,
            url: itData.friendlyURLSet ? itData.friendlyURLSet[0] : ""
          });
        }))
      );
  }

  /**
   * 
   * @param idCat 
   * @returns 
   */
  public cat(idCat: string): Observable<Category> {
    return this._jcms.get<Category>("data/" + idCat);
  }

}
