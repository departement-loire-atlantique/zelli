import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { LoginService } from '../services/login.service';

@Injectable()
export class JcmsBackendInterceptor implements HttpInterceptor {
  constructor(private _login: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // TODO if jcms url

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
      responseType: 'text', // FIX 201 return no JSON body
    });

    return next.handle(newReq).pipe(
      map((response) => {
        // FIX 201 return no JSON body
        if (response instanceof HttpResponse) {
          let body = response.body;
          if (response.body && response.body !== '') {
            try {
              body = JSON.parse(response.body);
              response = response.clone<any>({ body: body });
            } catch (e) {
              console.debug('error parse JSON rep : ' + e);
            }
          }
        }

        return response;
      })
    );
  }
}
