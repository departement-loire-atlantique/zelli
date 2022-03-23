import {
  HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JcmsBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let key = environment.apiKey;

    // TODO get user key if login

    const newReq = request.clone({
      headers: (request.headers ? request.headers : new HttpHeaders()).set("Accept", "application/json"),
      params: (request.params ? request.params : new HttpParams()).set("authKey", key)
    });

    return next.handle(newReq);
  }
}
