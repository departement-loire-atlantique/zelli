import { Component, OnInit } from '@angular/core';

import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LabelMngService } from '@/app/services/label-mng.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  //fields
  pseudo: string = '';
  pwd: string = '';
  saveLogin: boolean = false;

  process: boolean = false;

  constructor(
    public lblService: LabelMngService,
    private _jcms: JcmsClientService
  ) {}

  ngOnInit(): void {
    console.log('TODO login');
  }

  public login() {
    // this.process = true;
    console.log(this.pseudo);
    console.log(this.pwd);
    console.log(this.saveLogin);
    // TODO service account
  }
}
