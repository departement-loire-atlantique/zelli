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

    // Welcome Page

    this._lbls['lblTitleWelcome'] = {
      lbl: 'Bienvenue !',
      propJcms: 'jcmsplugin.zelli.lbl.welcome.title',
    };

    this._lbls['lblDescWelcome'] = {
      lbl: 'Zelli, c’est ton guide vers la majorité et l’autonomie. Il répond à toutes les questions que tu te poses, et t’aide dans tes démarches.',
      propJcms: 'jcmsplugin.zelli.lbl.welcome.desc',
    };

    this._lbls['lblWelcomeFooter'] = {
      lbl: 'En t’inscrivant, tu acceptes les ',
      propJcms: 'jcmsplugin.zelli.lbl.welcome.footer',
    };

    //
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

  public getLbl(idLbl: string): string {
    return this._lbls[idLbl].lbl;
  }

  public lblBaseline(): string {
    return this.getLbl('lblBaseline');
  }

  public lblDocTrieur(): string {
    return this.getLbl('lblTrieur');
  }

  public lblMotComp(): string {
    return this.getLbl('lblMotsComp');
  }

  public lblLiensUtiles(): string {
    return this.getLbl('lblLiensUtiles');
  }

  public lblTitleWelcome(): string {
    return this.getLbl('lblTitleWelcome');
  }

  public lblDescWelcome(): string {
    return this.getLbl('lblDescWelcome');
  }

  public lblWelcomeFooter(): string {
    return this.getLbl('lblWelcomeFooter');
  }
}

interface lbl {
  lbl: string;
  propJcms: string;
}
