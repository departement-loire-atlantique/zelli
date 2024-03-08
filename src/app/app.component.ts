import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import packageJson from 'package.json';

import { AppConfigService } from '@/app/services/app-config.service';
import { FirebaseInitializerService } from '@/app/services/firebase-initializer.service';

import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  message: any = null;

  constructor(
    private _login: LoginService,
    private firebaseInitializer: FirebaseInitializerService,
    private appConfigService: AppConfigService
  ) {
    if (!appConfigService.config.production) {
      console.log('===== DEV MODE =====');
      console.log('Url jcms : ' + appConfigService.config.urlJcms);
    }
    console.log(packageJson.name + ' V' + packageJson.version);
  }

  ngOnInit(): void {
    this._login.testToken();

    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey: this.appConfigService.config.firebase.vapidKey,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
          this._login.firebaseToken = currentToken;
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);

      this.message = payload;

      if (!('Notification' in window)) {
        console.log('Web Notification not supported');
        return;
      }

      Notification.requestPermission(function (permission) {
        var notification = new Notification(
          payload?.notification?.title || 'Notification Title',
          {
            body: payload?.notification?.body,
            dir: 'auto',
          }
        );
        setTimeout(function () {
          notification.close();
        }, 3000);
      });
    });
  }
}
