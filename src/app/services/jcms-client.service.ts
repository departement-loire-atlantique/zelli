import { HttpClient, HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JcmsClientService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.urlJcms + "rest/";
  }

  get<T>(endpoint: string, option?: OptionHttp): Observable<T> {
    return this.http.get<T>(this._url + endpoint, option);
  }

  post(endpoint: string, body: any, option?: OptionHttp): Observable<any> {
    return this.http.post(this._url + endpoint, body, option);
  }

  put(endpoint: string, body: any, option?: OptionHttp): Observable<any> {
    return this.http.put(this._url + endpoint, body, option);
  }

  delete(endpoint: string, option?: OptionHttp): Observable<any> {
    return this.http.delete(this._url + endpoint, option);
  }
}

interface OptionHttp {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
