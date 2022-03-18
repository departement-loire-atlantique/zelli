import { Injectable } from '@angular/core';
import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root'
})
export class LabelMngService {

  private _lblDocTrieur: string = "";
  private _propDocTrieur: string = "jcmsPlugin.TODO";

  constructor(private _jcms: JcmsClientService) {
    this.updateLblDocTrieur();
    // TODO
  }

  public updateLblDocTrieur(){
    //TODO call JCMS
    this._lblDocTrieur="Les documents à garder dans ton trieur";
  }
  
  public get lblDocTrieur(): string {
    return this._lblDocTrieur;
  }
}
