import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor() {
    if (!environment.production) {
      console.log("===== DEV MODE =====");
      console.log("Url jcms : " + environment.urlJcms);
    }
  }

  title = 'Zelli';
}
