import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from 'src/environments/environment';

import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  message: any = null;

  constructor(private _login: LoginService) {
    if (!environment.production) {
      console.log('===== DEV MODE =====');
      console.log('Url jcms : ' + environment.urlJcms);
    }
  }

  ngOnInit(): void {
    this._login.testToken();

    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
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
            icon: payload?.notification?.image
              ? payload?.notification?.image
              : 'src/assets/icons/icon-72x72.png',
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
