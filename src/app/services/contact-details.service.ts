import { Injectable } from '@angular/core';
import { Observable, map, mergeMap } from 'rxjs';

import {
  Contact,
  ContactFromApi,
  LocationFromApi,
} from '@/app/models/jcms/contact';
import { JcmsClientService } from '@/app/services/jcms-client.service';

@Injectable({
  providedIn: 'root',
})
export class ContactDetailsService {
  constructor(private jcmsClient: JcmsClientService) {}

  getContacts(resourceId: string): Observable<Contact> {
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
