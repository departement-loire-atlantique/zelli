import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * This component should be used to go back to the previous page.
 */
@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.less'],
})
export class BackComponent {
  /**
   * Text du lien de retour.
   * Default: Retour
   */
  @Input()
  text: string = 'Retour';

  /**
   * Titre du lien.
   * Default: Retour à la page précédente
   */
  @Input()
  titleLink: string = 'Retour à la page précédente';

  /**
   * icon du lien.
   * Default: icon-arrow-left
   */
  @Input()
  picto: string = 'icon-arrow-left';

  constructor(private _location: Location) {}

  /**
   * @ignore
   */
  back() {
    this._location.back();
  }
}
