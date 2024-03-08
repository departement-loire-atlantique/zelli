import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';

import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseInitializerService {
  constructor(private appConfigService: AppConfigService) {
    this.initializeApp();
  }

  private initializeApp() {
    const firebaseConfig = this.appConfigService.config.firebase;
    if (firebaseConfig) {
      initializeApp(firebaseConfig);
    } else {
      console.error('Firebase configuration not found');
    }
  }
}
