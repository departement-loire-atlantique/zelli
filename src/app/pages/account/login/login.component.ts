import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DesignSystemService } from '@/app/services/design-system.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { LoginService } from '@/app/services/login.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  //fields
  pseudo: string = '';
  pwd: string = '';
  saveLogin: boolean = false;

  process: boolean = false;

  loginError: boolean = false;
  loginErrorMsg: string =
    'Oups ! Ton pseudo et ton mot de passe ne correspondent pas.';

  constructor(
    private _router: Router,
    public lblService: LabelMngService,
    private _login: LoginService,
    private _ds: DesignSystemService,
    private titleService: Title,
    titlePage: TitlePage
  ) {
    this.titleService.setTitle(titlePage.getTitle('Me connecter'));
  }

  ngOnInit(): void {
    if (this._login.isLogged) {
      this._router.navigate(['/themes']);
    }
  }

  ngAfterViewInit(): void {
    this._ds.initForm();
  }

  public login() {
    this.loginError = false;
    this.process = true;

    let error: boolean = false;
    if (!this.pseudo || this.pseudo === '') {
      error = true;
      // TODO error DS
    }
    if (!this.pwd || this.pwd === '') {
      error = true;
      // TODO error DS
    }

    if (error) {
      this.process = false;
      return;
    }

    this._login.login(this.pseudo, this.pwd, this.saveLogin, {
      class: this,
      func: this.callbackLogin,
    });
  }

  private callbackLogin(status: boolean, msg?: string) {
    this.process = false;
    if (status) {
      this._router.navigate(['/intro']);
      return;
    }
    this.loginError = true;
    // TODO error DS
    // console.error('login KO : ' + msg);
  }
}
