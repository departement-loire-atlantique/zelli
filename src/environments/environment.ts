// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Dev without JCMS
export const environment = {
  production: false,
  urlJcms: '',
  apiKey: '',
  catNavMain: 'catHome',
  catIntro: 'TODO',
  catMainContent: 'TODO',
  catQuestions: '',
  catContact: '',
  catThemes: '',
  catAskQuestionRef: '',
  catAskQuestionForm: '',
  catAskQuestionSend: '',
  catExcludeSearch: '',
  firebase: {
    apiKey: 'AIzaSyD3n-pKkHumsQnVovVgf_FpEBYbKKWDhx8',
    authDomain: 'zelli-local.firebaseapp.com',
    projectId: 'zelli-local',
    storageBucket: 'zelli-local.appspot.com',
    messagingSenderId: '308279147291',
    appId: '1:308279147291:web:ffddaba7cfdfb3b39cf1be',
    measurementId: 'G-WH4LC8SL31',

    vapidKey:
      'BKu5WfJU0SoDOojTZ0b-tUIZbOBQK9pNsVKDiySdTPMd-8e2sSoYKT_ee10jR86hWgTTl10XsFBXJZenGfsng3w',
  },
  features: {
    contacts: false,
    customAlerts: false,
    editPhoto: false,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
