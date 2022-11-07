import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, mergeMap, of } from 'rxjs';

import {
  Contact,
  LocationFromApi,
  mapContactFromApi,
} from '@/app/models/jcms/contact';
import { JcmsClientService } from '@/app/services/jcms-client.service';

import { FicheContact } from '../models/jcms/ficheContact';

@Injectable({
  providedIn: 'root',
})
export class ContactDetailsService {
  constructor(
    private _jcmsClient: JcmsClientService,
    private router: Router,
    private _location: Location
  ) {}

  public getContacts(resourceId: string): Observable<Contact> {
    return this._jcmsClient
      .get<any>(`data/${resourceId}`)
      .pipe(
        mergeMap((contactFromApi) => {
          if (contactFromApi.class.includes('generated.FicheLieu')) {
            contactFromApi.lieuDeRattachement = contactFromApi;
            contactFromApi.adresseMail =
              contactFromApi.lieuDeRattachement.email;
          }
          if (contactFromApi.lieuDeRattachement != undefined) {
            return this._jcmsClient
              .get<LocationFromApi>(
                `data/${contactFromApi.lieuDeRattachement.id}`
              )
              .pipe(
                map((result) => ({
                  ...contactFromApi,
                  soustitre: result.soustitre,
                  chapo: result.chapo,
                  lieuDeRattachement: {
                    ...result,
                    city: result.commune ? result.commune.title : '',
                  },
                }))
              );
          } else {
            return of(contactFromApi);
          }
        })
      )
      .pipe(map((response) => mapContactFromApi(response)));
  }

  public createContact(contact: FicheContact) {
    if (contact) {
      let endpoint = 'data/FicheLieu';
      const options = contact.buildForSendApi();
      // let urlEncodedData = this._jcmsClient.encodeParamForBody(options);

      const params = new HttpParams({
        fromObject: options,
      });
      console.log(params);
      console.log(params.toString());

      this._jcmsClient.post(endpoint, params).subscribe({
        next: (rep) => {
          if (rep) {
            console.log('contact ajouté !');
            this.router.navigate(['/mycontacts/']);
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
