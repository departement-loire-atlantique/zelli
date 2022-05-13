import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@/environments/environment';

import { Member } from '../models/jcms/member';
import { JcmsClientService } from './jcms-client.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnDestroy {
  private _isLogged: boolean = false;

  private _personalToken: string | null = '';

  private _keyPersoToken: string = '_loginPersoToken';

  private _profilSubject: BehaviorSubject<Member | undefined>;
  private _profil: Member | undefined;
  public profil: Observable<Member | undefined>;

  constructor(private _router: Router, private _jcms: JcmsClientService) {
    this._profilSubject = new BehaviorSubject<Member | undefined>(undefined);
    this.profil = this._profilSubject.asObservable();

    this._personalToken = localStorage.getItem(this._keyPersoToken);

    if (!this._personalToken || this._personalToken === '') {
      console.debug('Member not logged');

      this._personalToken = environment.apiKey;
    } else {
      console.debug('Member logged');
      this._isLogged = true;
      // _profilSubject update when testToken call in default module
    }
  }

  ngOnDestroy(): void {
    this._profilSubject?.complete();
  }

  private clearPersonalToken() {
    this._isLogged = false;
    this.setProfil(undefined);
    this._personalToken = environment.apiKey;
    localStorage.removeItem(this._keyPersoToken);
  }

  private savePersonalToken(token: string) {
    localStorage.setItem(this._keyPersoToken, token);
  }

  private setProfil(mbr: Member | undefined) {
    this._profil = mbr;
    this._profilSubject.next(mbr);
  }

  /**
   * & update this.member
   * @returns true if is valid personal token (no API token)
   */
  public testToken(): boolean {
    if (this._personalToken === environment.apiKey) {
      this.clearPersonalToken();
      return false;
    }
    this._jcms.get<Member>('WhoAmI').subscribe({
      next: (rep: Member) => {
        console.log(rep);

        this.setProfil(rep);

        // if rep == token ok
        this._isLogged = true;
      },
      error: (error) => {
        console.log(error);
        // test type error (offline | disconnected)
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

  public updatePhoto(file: File) {
    if (this.isLogged && this._profil) {
      let form: FormData = new FormData();
      form.append('photo', file);
      this._jcms
        .put('data/Member/updatephoto/' + this._profil.login, form)
        .subscribe((rep) => {
          this.testToken(); // For update local member infos
        });
    }
  }

  /**
   *
   * @param params  format {'key': val, 'key2': val2}
   */
  public updateInfos(params: any) {
    if (this.isLogged && this._profil && params) {
      let urlEncodedData = '';
      let urlEncodedDataPairs = [];
      for (let name in params) {
        urlEncodedDataPairs.push(
          encodeURIComponent(name) + '=' + encodeURIComponent(params[name])
        );
      }
      urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

      this._jcms
        .post('data/' + this._profil.id, urlEncodedData)
        .subscribe((rep) => {
          this.testToken(); // For update local member infos
        });
    }
  }
}
