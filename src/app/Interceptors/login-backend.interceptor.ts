import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let key = environment.apiKey;

    // TODO get user key if login

    const newReq = request.clone({
      params: (request.params ? request.params : new HttpParams()).set("authKey", key)
    });

    return next.handle(newReq);
  }
}
