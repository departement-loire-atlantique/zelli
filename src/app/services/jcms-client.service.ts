import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JcmsClientService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.urlJcms;
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this._url + endpoint);
  }

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(this._url + endpoint, body);
  }

  put(endpoint: string, body: any): Observable<any> {
    return this.http.put(this._url + endpoint, body);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(this._url + endpoint);
  }
}
