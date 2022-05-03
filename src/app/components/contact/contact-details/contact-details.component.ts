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
}
