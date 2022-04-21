import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { JcmsClientService, OptionHttp } from '../services/jcms-client.service';

export class JcmsPager<T> {
  private _jcms: JcmsClientService;

  endpoint: string;

  option?: OptionHttp;

  load: boolean = true;

  pageSize: number = 10;

  start: number = 0;

  total: number = 0;

  dataInPage: T[] = [];

  curentPage: number = 1;

  constructor(jcms: JcmsClientService, endpoint: string, option?: OptionHttp) {
    this._jcms = jcms;
    this.endpoint = endpoint;
    this.option = option;
  }

  private setObs(): Observable<JcmsPager<T>> {
    this.load = true;
    return new Observable((observer) => {
      this._jcms.get(this.endpoint, this.option).subscribe((rep: any) => {
        console.log(rep);

        this.dataInPage = rep.dataSet;
        this.pageSize = rep.pageSize;
        this.start = rep.start;
        this.total = rep.total;

        this.curentPage = this.start / this.pageSize + 1;

        this.load = false;

        observer.next(this);

        observer.complete();
      });
      return { unsubscribe() {} };
    });
  }

  private setStart() {
    if (!this.option) {
      this.option = {};
    }

    let httpParam;
    if (this.option.params) {
      if (this.option.params instanceof HttpParams) {
        httpParam = this.option.params;
      } else {
        httpParam = new HttpParams();
        httpParam = httpParam.appendAll(this.option.params);
      }
    } else {
      httpParam = new HttpParams();
    }

    httpParam = httpParam.append('start', this.start);

    this.option.params = httpParam;
  }

  public get(): Observable<JcmsPager<T>> {
    return this.setObs();
  }

  public next(): Observable<JcmsPager<T>> {
    this.start += this.pageSize;
    this.setStart();
    return this.setObs();
  }

  public previous(): Observable<JcmsPager<T>> {
    this.start -= this.pageSize;
    this.setStart();
    return this.setObs();
  }
}
