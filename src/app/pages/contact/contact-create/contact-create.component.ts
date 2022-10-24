import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Contact } from '@/app/models/jcms/contact';
import { FicheContact } from '@/app/models/jcms/ficheContact';
import { ContactDetailsService } from '@/app/services/contact-details.service';
import { DesignSystemService } from '@/app/services/design-system.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.less'],
})
export class ContactCreateComponent implements OnInit, AfterViewInit {
  constructor(
    private _contactDetailsService: ContactDetailsService,
    public lblService: LabelMngService,
    private titleService: Title,
    private _ds: DesignSystemService,
    titlePage: TitlePage
  ) {
    this.titleService.setTitle(titlePage.getTitle('Ajouter un contact'));
  }

  contact!: Contact;
  ficheContact?: FicheContact;
  addContactRun!: boolean;
  // Fields
  nom!: string;
  telmobile!: string;
  telfixe!: string;
  email!: string;
  adresse!: string;
  commentaire!: string;

  ngOnInit(): void {
    this.addContactRun = false;
    this.nom = '';
    this.telmobile = '';
    this.telfixe = '';
    this.email = '';
    this.adresse = '';
    this.commentaire = '';
  }

  ngAfterViewInit(): void {
    this._ds.initForm();
  }

  public addContact(): void {
    if (!this.nom) {
      return;
    }

    this.addContactRun = true;

    this.ficheContact = new FicheContact(
      this.nom,
      this.telmobile,
      this.telfixe,
      this.email,
      this.adresse,
      this.commentaire
    );

    this._contactDetailsService.createContact(this.ficheContact);
  }
}
