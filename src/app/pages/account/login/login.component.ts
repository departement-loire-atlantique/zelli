import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DesignSystemService } from '@/app/services/design-system.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { LoginService } from '@/app/services/login.service';

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

  constructor(
    private _router: Router,
    public lblService: LabelMngService,
    private _login: LoginService,
    private _ds: DesignSystemService
  ) {}

  ngOnInit(): void {
    if (this._login.isLogged) {
      this._router.navigate(['/themes']);
    }
  }

  ngAfterViewInit(): void {
    this._ds.initForm();
  }

  public login() {
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
    // TODO error DS
    console.error('login KO : ' + msg);
  }
}
