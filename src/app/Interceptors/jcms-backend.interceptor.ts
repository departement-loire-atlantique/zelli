import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from '../services/login.service';

@Injectable()
export class JcmsBackendInterceptor implements HttpInterceptor {
  constructor(private _login: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let key = this._login.token;

    const newReq = request.clone({
      headers: (request.headers ? request.headers : new HttpHeaders()).set(
        'Accept',
        'application/json'
      ),
      params: (request.params ? request.params : new HttpParams()).set(
        'authKey',
        key
      ),
    });

    return next.handle(newReq);
  }
}
