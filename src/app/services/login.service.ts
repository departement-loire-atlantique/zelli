import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';

import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _isLogged: boolean = false;

  private _personalToken: string | null = '';

  private _keyPersoToken: string = '_loginPersoToken';

  constructor(private _jcms: JcmsClientService) {
    this._personalToken = localStorage.getItem(this._keyPersoToken);

    if (!this._personalToken || this._personalToken === '') {
      console.debug('Member not logged');

      this._personalToken = environment.apiKey;
    } else {
      console.debug('Member logged');
      if (this.testToken()) {
        this._isLogged = true;
      } else {
        this.clearPersonalToken();
      }
    }
  }

  private clearPersonalToken() {
    this._personalToken = environment.apiKey;
    localStorage.removeItem(this._keyPersoToken);
  }

  private savePersonalToken(token: string) {
    localStorage.setItem(this._keyPersoToken, token);
  }

  /**
   * @returns true if is valid token
   */
  public testToken(): boolean {
    // TODO
    return false;
  }

  public get isLogged(): boolean {
    return this._isLogged;
  }

  public get token(): string {
    return this._personalToken ? this._personalToken : '';
  }

  public login(
    pseudo: string,
    pwd: string,
    saveLogin: boolean,
    callback?: (status: boolean, msg?: string) => any
  ) {
    this.clearPersonalToken();
    // token to void for JcmsBackendInterceptor and use silent login
    this._personalToken = '';

    this._jcms
      .get('plugins/zelli/token/create/' + pseudo, {
        params: {
          silentLogin: pseudo,
          silentPassword: pwd,
        },
      })
      .subscribe({
        next: (rep) => {
          // TODO test rep
          if (callback) {
            callback(true);
          }
        },
        error: (error) => {
          if (callback) {
            callback(false, error);
          }
        },
      });
  }

  public createAccount() {}
}
