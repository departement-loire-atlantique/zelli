import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root'
})
export class LabelMngService {

  private _lblDocTrieur: string = "Les documents à garder dans ton trieur";
  private _propDocTrieur: string = "jcmsplugin.zelli.lbl.btn.garde.trieur";

  constructor(private _jcms: JcmsClientService) {
  }

  public initAllLbl(): any {
    return {"lbl": this.updateLblDocTrieur(), "lbl2": this.updateLblDocTrieur()};
  }

  public updateLblDocTrieur(): Observable<any> {
    this._lblDocTrieur = "Les documents à garder dans ton trieur";
    const lbl = this._jcms.get("admin/property/" + this._propDocTrieur);
    lbl.subscribe((rep: any) =>
      this._lblDocTrieur = rep.value
    );
    return lbl;
  }

  public get lblDocTrieur(): string {
    return this._lblDocTrieur;
  }
}
