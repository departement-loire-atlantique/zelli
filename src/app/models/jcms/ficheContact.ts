import { environment } from '@/environments/environment';

export class FicheContact {
  nom: string;
  telMobile: string;
  telFixe: string;
  email: string;
  adresse: string;
  commentaire: string;

  constructor(
    nom: string,
    telMobile: string,
    telFixe: string,
    email: string,
    adresse: string,
    commentaire: string
  ) {
    this.nom = nom;
    this.telMobile = telMobile;
    this.telFixe = telFixe;
    this.email = email;
    this.adresse = adresse;
    this.commentaire = commentaire;
  }

  public buildForSendApi() {
    return {
      title: this.nom,
      categorieDeNavigation: [environment.catContact],
      firstname: this.nom,
      phoneNumber: [this.telMobile, this.telFixe],
      email: this.email,
    };
  }
}
