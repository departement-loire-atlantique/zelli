import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CatHomeItem } from '../models/cat-home-item';
import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root'
})
export class CatHomeMngService {

  constructor(private _jcms: JcmsClientService) {
    if (!environment.production) {
      console.log('init CatHomeMngService');
    }
  }

  catFromServ(): Observable<CatHomeItem[]> {
    return this._jcms.get<CatHomeItem[]>("data/children/{id}")// TODO custom rest service
      .pipe(
        // ex rep voir /src/mock/catHome.json
        map((rep: any) => rep.dataSet.map((itData: any) => {
          return {
            title: itData.name,
            subTitle: "",
            icon: itData.icon,
            url: itData.friendlyURLSet ? itData.friendlyURLSet[0] : ""
          };
        }))
      );
  }

}
