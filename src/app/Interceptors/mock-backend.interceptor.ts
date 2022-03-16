import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // uniquement si pas d'url de jcms param
    if (environment.urlJcms === "") {

      const regexChildren = new RegExp("data\/children\/(.+)$");
      const resultChild = regexChildren.exec(request.url);
      if (resultChild) {
        console.log("Send mock children : " + resultChild[1]);
        const newReq = request.clone({ url: "assets/mock/cats/children/" + resultChild[1] + ".json" });
        return next.handle(newReq);
      }

      const regexData = new RegExp("data\/(.+)$");
      const resultDate = regexData.exec(request.url);
      if (resultDate) {
        console.log("Send mock data : " + resultDate[1]);
        const newReq = request.clone({ url: "assets/mock/cats/" + resultDate[1] + ".json" });
        return next.handle(newReq);
      }

    }
    return next.handle(request);
  }
}
