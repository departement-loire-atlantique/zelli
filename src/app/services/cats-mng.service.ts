import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../models/jcms/category';
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
        // ex rep voir \assets\mock\cats\children\**
        map((rep: any) => rep.dataSet.map((itData: any): Category =>
          this.mapToCat(itData)
        ))
      ).pipe(
        map((cats: Category[]) =>
          cats.sort((cat1, cat2) => cat1.order - cat2.order)
        )
      );
  }

  /**
   * 
   * @param idCat 
   * @returns 
   */
  public cat(idCat: string): Observable<Category> {
    return this._jcms.get<Category>("data/" + idCat)
      .pipe(
        // ex rep voir \assets\mock\cats\**
        map((rep: any): Category =>
          this.mapToCat(rep)
        )
      );
  }

  private mapToCat(dataRep: any): Category {
    return {
      id: dataRep.id,
      title: dataRep.name,
      smallTitle: dataRep.synonyms ? dataRep.synonyms[0] : dataRep.name,
      subTitle: dataRep.description,
      icon: dataRep.icon,
      image: dataRep.image,
      url: dataRep.friendlyURLSet ? dataRep.friendlyURLSet[0] : "",
      order: dataRep.order,
      idContentTrieur: ""/* TODO */
    };
  }

}
