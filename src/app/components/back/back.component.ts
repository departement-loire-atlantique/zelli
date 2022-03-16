import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.less']
})
export class BackComponent implements OnInit {

  @Input()
  text: string = "Retour";

  @Input()
  titleLink: string = "Retour à la page précédente";

  @Input()
  picto: string = "icon-arrow-left";


  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  back() {
    this._location.back();
  }

}
