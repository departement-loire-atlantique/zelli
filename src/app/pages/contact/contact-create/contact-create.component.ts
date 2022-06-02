import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.less'],
})
export class ContactCreateComponent implements OnInit {
  addContactRun!: boolean;
  // Fields
  nom!: string;
  telmobile!: string;
  telfixe!: string;
  email!: string;
  adresse!: string;
  commentaire!: string;

  constructor() {}

  ngOnInit(): void {
    this.addContactRun = false;
    this.nom = '';
    this.telmobile = '';
    this.telfixe = '';
    this.email = '';
    this.adresse = '';
    this.commentaire = '';
  }

  public addContact() {
    console.log(
      this.nom +
        ' - ' +
        this.telmobile +
        ' - ' +
        this.telfixe +
        ' - ' +
        this.email +
        ' - ' +
        this.adresse +
        ' - ' +
        this.commentaire
    );
  }
}
