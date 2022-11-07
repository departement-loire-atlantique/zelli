import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, bufferCount, from, mergeMap } from 'rxjs';

import { Item } from '@/app/components/list/list.component';
import { Contact } from '@/app/models/jcms/contact';
import { ContactDetailsService } from '@/app/services/contact-details.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less'],
})
export class ContactComponent implements OnInit, OnDestroy {
  @Input()
  contactIds!: string[];

  @Input()
  name?: string;

  isLoading = false;
  isError = false;

  contacts: Contact[] = [];

  contactsSubscription$?: Subscription;

  constructor(private contactDetailsService: ContactDetailsService) {}

  ngOnInit(): void {
    this.loadContactDetails();
  }

  private loadContactDetails() {
    this.isLoading = true;
    this.isError = false;

    this.contactsSubscription$ = from(this.contactIds)
      .pipe(mergeMap((value) => this.contactDetailsService.getContacts(value)))
      .pipe(bufferCount(this.contactIds.length)) // Only emit data once they are all fully loaded
      .subscribe({
        error: (error) => {
          console.error(
            `Something went wrong while loading contact details (contact id ${this.contactIds[0]})`,
            error
          );
          this.isError = true;
          this.isLoading = false;
        },
        next: (data) => {
          this.contacts = data;
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.contactsSubscription$?.unsubscribe();
  }

  getContactsForListing(): Item[] {
    // return this.contacts.map((contact) => ({
    //   url: `/contact/details/${contact.id}`,
    //   lbl: contact.title,
    // }));

    let item: Item[] = [];
    if (this.contacts) {
      for (let contact of this.contacts) {
        item.push({
          url: `/contact/details/${contact.id}`,
          lbl: contact.title,
        });
      }
    }
    return item;
  }
}
