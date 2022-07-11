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
      this.contact?.location?.building ||
      this.contact?.location?.stairOrCorridor ||
      this.contact?.location?.roadName ||
      this.contact?.location?.cs ||
      this.contact?.location?.postalCode ||
      this.contact?.location?.city ||
      this.contact?.location?.cedex
    ) {
      return true;
    }
    return false;
  }
}
