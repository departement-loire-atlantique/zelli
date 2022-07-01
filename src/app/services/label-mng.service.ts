import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { lbl, lbls } from '../models/lblsList';
import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root',
})
export class LabelMngService {
  private _lbls: { [key: string]: lbl } = lbls;

  obsLbls: { [key: string]: Observable<any> } = {};

  constructor(private _jcms: JcmsClientService) {
    this.obsLbls = this.initAllLbl();
  }

  private initAllLbl(): { [key: string]: Observable<any> } {
    let rep: any = {};
    for (let key in this._lbls) {
      rep[key] = this.updateLbl(this._lbls[key]);
    }
    return rep;
  }

  public updateLbl(lbl: lbl): Observable<any> {
    const obs = this._jcms.get('plugins/zelli/prop/' + lbl.propJcms).pipe(
      catchError((error) => {
        return of(null);
      })
    );
    obs.subscribe((rep: any) => {
      if (rep) {
        lbl.lbl = rep.value;
      }
    });
    return obs;
  }

  public getLbl(idLbl: string): string {
    return this._lbls[idLbl]?.lbl;
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
