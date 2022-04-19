import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, mergeMap } from 'rxjs';

import { JcmsClientService } from '@/app/services/jcms-client.service';

export type Contact = {
  id: string;
  title: string;
  firstname: string;
  lastname: string;
  gender: string;
  idPicture: string;
  job: string;
  location: Partial<Location>;
  phoneNumber: string[];
  email: string;
};

export type Location = {
  id: string;
  title: string;
  stairOrCorridor: string;
  enterNumber: string;
  roadNumber: string;
  roadName: string;
  place: string;
  postalCode: string;
  city: string;
  website: string[];
  cs: string;
  cedex: string;
};

export type LocationFromApi = {
  id: string;
  title: string;
  etageCouloirEscalier: string;
  entreeBatimentImmeuble: string;
  ndeVoie: string;
  libelleDeVoie: string;
  lieudit: string;
  codePostal: string;
  commune: { id: string; title: string };
  libelleAutreAdresse: string;
  etageCouloirEscalier2: string;
  entreeBatimentImmeuble2: string;
  ndeVoie2: string;
  libelleDeVoie2: string;
  lieudit2: string;
  codePostal2: string;
  cs2: string;
  cedex2: string;
  telephone: string[];
  email: string[];
  siteInternet: string[];
  plusDeDetailInterneDBID: string;
  plusDeDetailExterne: string;
  texteAlternatifLien: string;
  complementTypeDacces: string;
  pourQui: string;
  modalitesDaccueil: string;
  horairesEtAcces: string;
  transportsEnCommun: string;
  parkings: string;
  description: string;
  lienDeLaPageFacebook: string;
  lienDeLaPageInstagram: string;
  toutesLesCommunesDuDepartement: false;
  arretsDeTransportsEnCommunAccess: false;
  presenceDunePlacePMRSurLespacePu: false;
  presenceDunePlacePMRDansLERP: false;
  visiophone: false;
  sonnette: false;
  signaletiqueDirectionnelle: false;
  entreeDePlainpied: false;
  portesAutomatiques: false;
  rampeFixe: false;
  rampeAmovible: false;
  ascenseurMontecharge: false;
  presenceDePersonnelALaccueil: false;
  personnelDaccueilFormeAuxDiffere: false;
  personnelDaccueilFormeALaLangueD: false;
  siOuiHorairesDePresence: string;
  planningDeMiseEnAccessibiliteDuS: string;
  informationsComplementaires: string;
  externalLinkSet: string[];
};

export type ContactFromApi = {
  id: string;
  title: string;
  nom: string;
  prenom: string;
  civilite: string;
  photoDidentite: string;
  fonction: string;
  lieuDeRattachement: Partial<LocationFromApi>;
  telephone: string[];
  adresseMail: string;
};

@Injectable()
export class ContactDetailsService {
  constructor(private jcmsClient: JcmsClientService) {}

  getContacts(resourceId: string): Observable<any> {
    return this.jcmsClient
      .get<ContactFromApi>(`data/${resourceId}`)
      .pipe(
        mergeMap((contactFromApi) =>
          this.jcmsClient
            .get<LocationFromApi>(
              `data/${contactFromApi.lieuDeRattachement.id}`
            )
            .pipe(
              map((result) => ({
                ...contactFromApi,
                lieuDeRattachement: {
                  ...result,
                  city: result.commune.title,
                },
              }))
            )
        )
      )
      .pipe(
        map<ContactFromApi, Contact>((response) =>
          this.mapContactFromApi(response)
        )
      );
  }

  private mapContactFromApi(contact: ContactFromApi): Contact {
    return {
      firstname: contact.prenom,
      gender: contact.civilite,
      id: contact.id,
      lastname: contact.nom,
      title: contact.title,
      email: contact.adresseMail,
      idPicture: contact.photoDidentite,
      job: contact.fonction,
      phoneNumber: contact.telephone,
      location: {
        id: contact.lieuDeRattachement.id,
        title: contact.lieuDeRattachement.title,
        city: contact.lieuDeRattachement.commune?.title,
        enterNumber: contact.lieuDeRattachement.entreeBatimentImmeuble,
        place: contact.lieuDeRattachement.lieudit,
        postalCode: contact.lieuDeRattachement.codePostal,
        roadName: contact.lieuDeRattachement.libelleDeVoie,
        roadNumber: contact.lieuDeRattachement.ndeVoie,
        stairOrCorridor: contact.lieuDeRattachement.etageCouloirEscalier,
        website: contact.lieuDeRattachement.siteInternet,
        cs: contact.lieuDeRattachement.cs2
          ? `CS ${contact.lieuDeRattachement.cs2}`
          : undefined,
        cedex: contact.lieuDeRattachement.cedex2
          ? `CEDEX ${contact.lieuDeRattachement.cedex2}`
          : undefined,
      },
    };
  }
}
