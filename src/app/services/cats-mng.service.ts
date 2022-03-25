import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    return this._jcms.get<Category[]>("data/children/" + idCat, {params: {"pagerAll": "true"}})
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
    return this._jcms.get<Category>("data/" + idCat, {params: {"related" : "extraData.extra.Category.jcmsplugin.zelli.contenu.trieur"}})
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
      icon: dataRep.icon && dataRep.icon.startsWith("upload") ? environment.urlJcms + dataRep.icon : dataRep.icon,
      image: dataRep.image && dataRep.image.startsWith("upload") ? environment.urlJcms + dataRep.image : dataRep.image,
      url: dataRep.friendlyURLSet ? dataRep.friendlyURLSet[0] : "",
      order: dataRep.order,
      idContentTrieur: dataRep.related ? dataRep.related.extraDataextraCategoryjcmspluginzellicontenutrieur : "c_5256" // TODO sup c_5256 (bug JCMS)
    };
  }

}
