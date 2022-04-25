import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root',
})
export class LabelMngService {
  private _lbls: { [key: string]: lbl } = {};

  constructor(private _jcms: JcmsClientService) {
    this._lbls['lblBaseline'] = {
      lbl: "Ton guide vers la majorité et l'autonomie",
      propJcms: 'jcmsplugin.zelli.lbl.baseline',
    };

    this._lbls['lblTrieur'] = {
      lbl: 'Les documents à garder dans ton trieur',
      propJcms: 'jcmsplugin.zelli.lbl.btn.contenu.trieur',
    };

    this._lbls['lblMotsComp'] = {
      lbl: 'Les mots compliqués',
      propJcms: 'jcmsplugin.zelli.lbl.mots.compliques',
    };

    this._lbls['lblLiensUtiles'] = {
      lbl: 'Les liens utiles',
      propJcms: 'jcmsplugin.zelli.lbl.liens.utiles',
    };
  }

  public initAllLbl(): any {
    let rep: any = {};
    for (let key in this._lbls) {
      rep[key] = this.updateLbl(this._lbls[key]);
    }
    return rep;
  }

  public updateLbl(lbl: lbl): Observable<any> {
    const obs = this._jcms.get('plugins/zelli/prop/' + lbl.propJcms);
    obs.subscribe((rep: any) => (lbl.lbl = rep.value));
    return obs;
  }

  public lblBaseline(): string {
    return this._lbls['lblBaseline'].lbl;
  }

  public lblDocTrieur(): string {
    return this._lbls['lblTrieur'].lbl;
  }

  public lblMotComp(): string {
    return this._lbls['lblMotsComp'].lbl;
  }

  public lblLiensUtiles(): string {
    return this._lbls['lblLiensUtiles'].lbl;
  }
}

interface lbl {
  lbl: string;
  propJcms: string;
}
