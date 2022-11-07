import { HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';

import {
  Contact,
  ContactFromApi,
  LocationFromApi,
  buildForSendApi,
  mapContactFromApi,
} from '@/app/models/jcms/contact';
import { ContactDetailsService } from '@/app/services/contact-details.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LoginService } from '@/app/services/login.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

import { environment } from '@/environments/environment';

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

  isLogged!: boolean;

  isLoading = false;
  isError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _jcms: JcmsClientService,
    private _login: LoginService,
    private contactDetailsService: ContactDetailsService,
    private titleService: Title,
    titlePage: TitlePage
  ) {
    this.titleService.setTitle(titlePage.getTitle('Détail contact'));
  }

  ngOnInit(): void {
    this.isLogged = this._login.isLogged;
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

  addContact() {
    this._jcms.get<Contact>('data/' + this.contactId).subscribe((res: any) => {
      let contact = res as LocationFromApi;
      let typeName: string = 'FicheLieu';
      const options = buildForSendApi(contact);

      const params = new HttpParams({
        fromObject: options,
      });
      console.log(params);
      console.log(params.toString());

      this._jcms.post('data/' + typeName, params).subscribe({
        // ajouter verif de double chez l'utilisateur
        next: (rep) => {
          if (rep) {
            console.log('contact ajouté !');
            this.router.navigate(['/mycontacts/']);
          }
        },
        error: () => {
          console.log("erreur lors de l'ajout d'un contact");
        },
      });
    });
  }
}
