import { Component, Input } from '@angular/core';

import { Contact } from '@/app/models/jcms/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.less'],
})
export class ContactDetailsComponent {
  @Input()
  contact?: Partial<Contact>;

  @Input()
  noTitle = false;

  public isContactlocation(): boolean {
    if (
      this.contact?.location?.building === undefined &&
      this.contact?.location?.stairOrCorridor == undefined &&
      this.contact?.location?.roadName === undefined &&
      this.contact?.location?.cs === undefined &&
      this.contact?.location?.postalCode === undefined &&
      this.contact?.location?.city === undefined &&
      this.contact?.location?.cedex === undefined
    ) {
      return false;
    }
    return true;
  }
}
