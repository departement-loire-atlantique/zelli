import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitlePage {
  constructor() {}

  public getTitle(pageName: string) {
    return pageName + ' | Zelli';
  }
}
