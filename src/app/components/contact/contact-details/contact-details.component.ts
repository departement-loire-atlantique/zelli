import { Component, Input, OnInit } from '@angular/core';

import { Contact } from '@/app/models/jcms/contact';
import { ContactDetailsService } from '@/app/services/contact-details.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.less'],
})
export class ContactDetailsComponent implements OnInit {
  @Input()
  contactId!: string;

  @Input()
  name?: string;

  isLoading = false;
  isError = false;

  contact?: Partial<Contact>;

  constructor(private contactDetailsService: ContactDetailsService) {}

  ngOnInit(): void {
    this.loadContactDetails();
  }

  private loadContactDetails() {
    this.isLoading = true;
    this.isError = false;
    this.contactDetailsService.getContacts(this.contactId).subscribe({
      error: (error) => {
        console.error(
          `Something went wrong while loading contact details (contact id ${this.contactId})`,
          error
        );
        this.isError = true;
        this.isLoading = false;
      },
      next: (data) => {
        this.contact = data;
        this.isLoading = false;
      },
    });
  }
}
