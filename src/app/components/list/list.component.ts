import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent {
  static regInternLink: RegExp = /^(\/|\.\/)/;

  @Input()
  items: Item[] | undefined;

  @Input()
  cssClass: string | undefined;

  constructor() {}

  public isInterLink(url: string): boolean {
    return ListComponent.regInternLink.test(url);
  }
}

export interface Item {
  lbl: string;
  url?: string;
  img?: string;
}
