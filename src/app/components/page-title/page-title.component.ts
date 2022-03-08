import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.less']
})
export class PageTitleComponent implements OnInit {

  @Input()
  titlePage: string = "{Def Title. edit titlePage}";

  constructor() { }

  ngOnInit(): void {
  }

}
