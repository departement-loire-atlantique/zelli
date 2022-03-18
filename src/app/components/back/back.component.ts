import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.less']
})
export class BackComponent implements OnInit {

  /**
   * Text du lien de retour.
   * Default: Retour
   */
  @Input()
  text: string = "Retour";

  /**
   * Titre du lien.
   * Default: Retour à la page précédente
   */
  @Input()
  titleLink: string = "Retour à la page précédente";

  /**
   * icon du lien.
   * Default: icon-arrow-left
   */
  @Input()
  picto: string = "icon-arrow-left";


  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  back() {
    this._location.back();
  }

}
