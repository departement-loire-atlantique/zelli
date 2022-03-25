import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapser',
  templateUrl: './collapser.component.html',
  styleUrls: ['./collapser.component.less']
})
export class CollapserComponent implements OnInit {

  @Input()
  dataTitle: string[]| undefined;

  @Input()
  dataVal: string[]| undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
