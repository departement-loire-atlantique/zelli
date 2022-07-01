import { Component, Input, OnInit } from '@angular/core';

import { Contact } from '@/app/models/jcms/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.less'],
})
export class ContactDetailsComponent implements OnInit {
  mail: string[] = [];

  ngOnInit(): void {
    if (typeof this.contact?.email === 'string') {
      this.mail.push(this.contact.email);
    } else {
      this.mail = this.contact?.email || [];
    }
  }

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
