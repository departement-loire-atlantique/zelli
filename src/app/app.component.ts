import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  constructor(private _login: LoginService) {
    if (!environment.production) {
      console.log('===== DEV MODE =====');
      console.log('Url jcms : ' + environment.urlJcms);
    }
  }

  ngOnInit(): void {
    this._login.testToken();
  }
}
