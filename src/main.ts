import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Fonction asynchrone pour attendre le chargement de la configuration
function loadAppConfig() {
  return new Promise<void>((resolve) => {
    const checkConfigLoaded = () => {
      // @ts-ignore
      if (window['envConfig']) {
        resolve();
      } else {
        setTimeout(checkConfigLoaded, 100);
      }
    };
    checkConfigLoaded();
  });
}

// initialiser l'application Angular une fois le json de l'environnement chargé
loadAppConfig().then(() => {
  // @ts-ignore
  if (window['envConfig'] && window['envConfig'].production) {
    enableProdMode();
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
