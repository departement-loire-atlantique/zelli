import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, map } from 'rxjs';

import { Contact } from '@/app/models/jcms/contact';
import { ContactDetailsService } from '@/app/services/contact-details.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

@Component({
  selector: 'app-page-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.less'],
})
export class PageContactDetailsComponent implements OnInit, OnDestroy {
  @Input()
  fromContactPage = false;

  contactId$ = this.route.paramMap.pipe(
    map((params: ParamMap) => params.get('contactId') ?? undefined)
  );

  private subscription?: Subscription;
  private contactsSubscription?: Subscription;

  contactId?: string;
  contact?: Contact;
  mail: string[] = [];

  isLoading = false;
  isError = false;

  constructor(
    private route: ActivatedRoute,
    private contactDetailsService: ContactDetailsService,
    private titleService: Title,
    titlePage: TitlePage
  ) {
    this.titleService.setTitle(titlePage.getTitle('Détail contact'));
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.subscription = this.contactId$.subscribe({
      next: (contactId) => {
        this.contactId = contactId;
        if (contactId) {
          this.loadContactDetails(contactId);
        }
      },
      error: (error) => {
        console.error(
          'Something went wrong while fetching contact details',
          error
        );
      },
    });
  }

  private loadContactDetails(contactId: string) {
    this.isLoading = true;
    this.isError = false;

    this.contactsSubscription = this.contactDetailsService
      .getContacts(contactId)
      .subscribe({
        error: (error) => {
          console.error(
            `Something went wrong while loading contact details (contact id ${contactId})`,
            error
          );
          this.isError = true;
          this.isLoading = false;
        },
        next: (data) => {
          this.contact = data;
          if (typeof this.contact?.email === 'string') {
            this.mail.push(this.contact.email);
          } else {
            this.mail = this.contact?.email;
          }
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.contactsSubscription?.unsubscribe();
    this.subscription?.unsubscribe();
  }

  getContactLocation(): string {
    const location = this.contact?.location;
    return [
      location?.building,
      location?.stairOrCorridor,
      location?.roadNumber,
      location?.roadName,
      location?.place,
      location?.cs,
      location?.postalCode,
      location?.city,
      location?.cedex,
    ]
      .join(' ')
      .trim();
  }
}
