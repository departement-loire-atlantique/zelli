import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent {
  @Input()
  items: item[] | undefined;

  constructor() {}
}

export interface item {
  lbl: string;
  url?: string;
  img?: string;
}
