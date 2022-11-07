import { HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { environment } from '@/environments/environment';

import { Member, mapApiToMember } from '../models/jcms/member';
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

  public firebaseToken: string = '';

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
    this._personalToken = token;
    localStorage.setItem(this._keyPersoToken, token);
  }

  private setProfil(mbr: Member | undefined) {
    this._profil = mbr;
    this._profilSubject.next(mbr);
  }

  public getProfilId() {
    return this._profil?.id;
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
    this._jcms
      .get<Member>('WhoAmI', {
        params: {
          related: 'extraDataMap',
        },
      })
      .pipe(map((rep: any): Member => mapApiToMember(rep)))
      .subscribe({
        next: (rep: Member) => {
          console.debug(rep);

          this.setProfil(rep);

          // if rep == token ok
          this._isLogged = true;

          // send firebase Token
          this.sendFirebaseToken();
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
    const params = new HttpParams()
      .set('silentLogin', pseudo)
      .set('silentPassword', pwd);
    this._jcms
      .get('plugins/zelli/token/create/' + pseudo, { params })
      .subscribe({
        next: (rep: any) => {
          // TODO test rep
          let reponseJson = JSON.stringify(rep);
          let index = reponseJson.indexOf(':');
          this.savePersonalToken(
            reponseJson.substring(index + 2, reponseJson.length - 2)
          );
          this.testToken();

          // send firebase Token
          this.sendFirebaseToken();

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

  public createMember(
    pseudo: string,
    dateNaissance: string,
    pwd: string,
    callback?: { class: any; func: (status: boolean, msg?: string) => any }
  ) {
    let body = new URLSearchParams();
    body.set('login', Buffer.from(pseudo).toString('base64'));
    body.set('dateNaissance', dateNaissance);
    body.set('pwd', Buffer.from(pwd).toString('base64'));

    this._jcms.post('plugins/zelli/member/create', body.toString()).subscribe({
      next: (rep: any) => {
        if (JSON.stringify(rep).includes('token')) {
          let reponseJson = JSON.stringify(rep);
          let index = reponseJson.indexOf(':');
          this.savePersonalToken(
            reponseJson.substring(index + 2, reponseJson.length - 2)
          );
          this.testToken();

          // send firebase Token
          this.sendFirebaseToken();

          if (callback) {
            callback.func.call(callback.class, true);
          }
        }
      },
      error: (error) => {
        // TODO error
        console.log(error);
        if (callback) {
          callback.func.call(callback.class, false, error.error.status);
        }
        // TODO sup
      },
    });
  }

  public isMemberNotExist(
    pseudo: string,
    callback?: { class: any; func: (status: boolean, msg?: string) => any }
  ) {
    this._jcms.get('plugins/zelli/member/notexist/' + pseudo).subscribe({
      next: (rep: any) => {
        if (JSON.stringify(rep).includes('success')) {
          if (callback) {
            callback.func.call(callback.class, true);
          }
          // TODO error DS
        } else {
          callback?.func.call(callback.class, false);
        }
      },
      error: (error) => {
        // TODO error DS
        callback?.func.call(callback.class, false, error.error.status);
      },
    });
  }

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
  public updateInfos(params: { [key: string]: any }) {
    if (this.isLogged && this._profil && params) {
      let urlEncodedData = this._jcms.encodeParamForBody(params);

      this._jcms
        .post('data/' + this._profil.id, urlEncodedData)
        .subscribe((rep) => {
          this.testToken(); // For update local member infos
        });
    }
  }

  private sendFirebaseToken() {
    if (!this.firebaseToken) {
      return;
    }

    if (this._profil) {
      this.sendFirebaseTokenForMbr(this._profil);
    } else {
      this.profil.subscribe((mbr: Member | undefined) => {
        if (mbr) {
          this.sendFirebaseTokenForMbr(mbr);
        }
      });
    }
  }
  private sendFirebaseTokenForMbr(mbr: Member) {
    const data = {
      extraDBValues: this.firebaseToken,
      extraDBKeys: 'extradb.Member.jcmsplugin.zelli.firebase.token',
    };
    const urlEncodedData = this._jcms.encodeParamForBody(data);
    this._jcms.post('data/' + mbr.id, urlEncodedData).subscribe();
  }
}
