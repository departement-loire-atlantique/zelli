import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from '@/app/services/app-config.service';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  constructor(private appConfigService: AppConfigService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // uniquement si pas d'url de jcms param
    if (this.appConfigService.config.urlJcms === '') {
      const regexChildren = new RegExp('data/children/(.+)$');
      const resultChild = regexChildren.exec(request.url);
      if (resultChild) {
        console.log('Send mock children : ' + resultChild[1]);
        const newReq = request.clone({
          url: 'assets/mock/children/' + resultChild[1] + '.json',
        });
        return next.handle(newReq);
      }

      const regexData = new RegExp('data/(.+)$');
      const resultDate = regexData.exec(request.url);
      if (resultDate) {
        console.log('Send mock data : ' + resultDate[1]);
        const newReq = request.clone({
          url: 'assets/mock/' + resultDate[1] + '.json',
        });
        return next.handle(newReq);
      }
    }
    return next.handle(request);
  }
}
