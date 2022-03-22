import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-has-helped',
  templateUrl: './has-helped.component.html',
  styleUrls: ['./has-helped.component.less']
})
export class HasHelpedComponent implements OnInit {

  @Input()
  contentId: string | undefined;

  //TODO Google tag

  constructor() { }

  ngOnInit(): void {
  }

}
