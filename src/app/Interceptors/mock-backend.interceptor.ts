import {
  HttpClient,
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // uniquement si pas d'url de jcms param
    if (environment.urlJcms === "") {
      if (request.url.endsWith("data/children/" + environment.catNavMain)) {
        console.log("Send mock");
        const newReq = request.clone({ url: "assets/mock/cats/catHome.json" });
        return next.handle(newReq);
      }

      if(request.url.endsWith("data/children/themesCatId")){
        console.log("Send mock");
        const newReq = request.clone({ url: "assets/mock/cats/catThemes.json" });
        return next.handle(newReq);
      }

    }
    return next.handle(request);
  }
}
