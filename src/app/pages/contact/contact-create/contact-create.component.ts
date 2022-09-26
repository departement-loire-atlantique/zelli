import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Contact } from '@/app/models/jcms/contact';
import { ContactDetailsService } from '@/app/services/contact-details.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.less'],
})
export class ContactCreateComponent implements OnInit {
  constructor(
    private _contactDetailsService: ContactDetailsService,
    public lblService: LabelMngService,
    private titleService: Title,
    titlePage: TitlePage
  ) {
    this.titleService.setTitle(titlePage.getTitle('Ajouter un contact'));
  }

  contact!: Contact;
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

  public addContact(): void {
    console.log(this.contact.lastname);
    if (!this.nom) {
      return;
    }
    this.addContactRun = true;

    this.contact.lastname = this.nom;
    this.contact.phoneNumber = [this.telmobile + this.telfixe];
    this.contact.email = this.email;
    this.contact.location.roadName = this.adresse;
    this.contact.subTitle = this.commentaire;

    this._contactDetailsService.createContact(this.contact);
  }
}
