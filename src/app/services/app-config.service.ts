import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  get config() {
    // @ts-ignore
    return window.envConfig;
  }
}
