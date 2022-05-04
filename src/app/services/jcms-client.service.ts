import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { JcmsPager } from '../core/jcmsPager';

@Injectable({
  providedIn: 'root',
})
export class JcmsClientService {
  private _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.urlJcms + 'rest/';
  }

  get<T>(endpoint: string, option?: OptionHttp): Observable<T> {
    return this.http.get<T>(this._url + endpoint, option).pipe(
      map((rep: any) => {
        if (rep.dataSet) {
          rep.dataSet.sort((cat1: any, cat2: any) => cat1.order - cat2.order);
        }
        return rep;
      })
    );
  }

  getPager<T>(endpoint: string, option?: OptionHttp): Observable<JcmsPager<T>> {
    return new JcmsPager<T>(this, endpoint, option).get();
  }

  post(endpoint: string, body?: any, option?: OptionHttp): Observable<any> {
    return this.http.post(this._url + endpoint, body, option);
  }

  put(endpoint: string, body?: any, option?: OptionHttp): Observable<any> {
    return this.http.put(this._url + endpoint, body, option);
  }

  delete(endpoint: string, option?: OptionHttp): Observable<any> {
    return this.http.delete(this._url + endpoint, option);
  }
}

export interface OptionHttp {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
