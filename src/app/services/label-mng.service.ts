import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root',
})
export class LabelMngService {
  private _lbls: lbl[] = [
    {
      id: 'lblTrieur',
      lbl: 'Les documents à garder dans ton trieur',
      propJcms: 'jcmsplugin.zelli.lbl.btn.contenu.trieur',
    },
    {
      id: 'lblMotsComp',
      lbl: 'Les mots compliqués',
      propJcms: 'jcmsplugin.zelli.lbl.mots.compliques',
    },
    {
      id: 'lblLiensUtiles',
      lbl: 'Les liens utiles',
      propJcms: 'jcmsplugin.zelli.lbl.liens.utiles',
    },
  ];

  constructor(private _jcms: JcmsClientService) {}

  public initAllLbl(): any {
    let rep: any = {};
    for (let itLbl of this._lbls) {
      rep[itLbl.id] = this.updateLbl(itLbl);
    }
    return rep;
  }

  public updateLbl(lbl: lbl): Observable<any> {
    const obs = this._jcms.get('plugins/zelli/prop/' + lbl.propJcms);
    obs.subscribe((rep: any) => (lbl.lbl = rep.value));
    return obs;
  }

  public lblDocTrieur(): string {
    return this._lbls[0].lbl;
  }

  public lblMotComp(): string {
    return this._lbls[1].lbl;
  }

  public lblLiensUtiles(): string {
    return this._lbls[2].lbl;
  }
}

interface lbl {
  id: string;
  lbl: string;
  propJcms: string;
}
