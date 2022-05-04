import { Injectable } from '@angular/core';
import { Observable, map, mergeMap } from 'rxjs';

import {
  Contact,
  ContactFromApi,
  LocationFromApi,
  mapContactFromApi,
} from '@/app/models/jcms/contact';
import { JcmsClientService } from '@/app/services/jcms-client.service';

@Injectable({
  providedIn: 'root',
})
export class ContactDetailsService {
  constructor(private _jcmsClient: JcmsClientService) {}

  public getContacts(resourceId: string): Observable<Contact> {
    return this._jcmsClient
      .get<ContactFromApi>(`data/${resourceId}`)
      .pipe(
        mergeMap((contactFromApi) =>
          this._jcmsClient
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
                  city: result.commune.title,
                },
              }))
            )
        )
      )
      .pipe(map((response) => mapContactFromApi(response)));
  }
}
