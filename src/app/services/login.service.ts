import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@/environments/environment';

import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _isLogged: boolean = false;

  private _personalToken: string | null = '';

  private _keyPersoToken: string = '_loginPersoToken';

  constructor(private _router: Router, private _jcms: JcmsClientService) {
    this._personalToken = localStorage.getItem(this._keyPersoToken);

    if (!this._personalToken || this._personalToken === '') {
      console.debug('Member not logged');

      this._personalToken = environment.apiKey;
    } else {
      console.debug('Member logged');
      this._isLogged = true;
    }
  }

  private clearPersonalToken() {
    this._isLogged = false;
    this._personalToken = environment.apiKey;
    localStorage.removeItem(this._keyPersoToken);
  }

  private savePersonalToken(token: string) {
    localStorage.setItem(this._keyPersoToken, token);
  }

  /**
   * @returns true if is valid personal token (no API token)
   */
  public testToken(): boolean {
    if (this._personalToken === environment.apiKey) {
      this.clearPersonalToken();
      return false;
    }
    this._jcms.get('WhoAmI').subscribe({
      next: (rep) => {
        console.log(rep);

        // if rep == token ok
        this._isLogged = true;
      },
      error: (error) => {
        console.log(error);
        // if error == token ko
        this.clearPersonalToken();

        this._router.navigate(['/welcome']);
      },
    });
    return true; // test async
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
    callback?: { class: any; func: (status: boolean, msg?: string) => any }
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
            callback.func.call(callback.class, true);
          }
        },
        error: (error) => {
          this.clearPersonalToken();
          if (callback) {
            callback.func.call(callback.class, false, error.error.status);
          }
        },
      });
  }

  public createAccount() {}
}
