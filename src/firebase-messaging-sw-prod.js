if (
  ServiceWorkerRegistration &&
  'pushManager' in ServiceWorkerRegistration.prototype
) {
  importScripts(
    'https://www.gstatic.com/firebasejs/9.8.4/firebase-app-compat.js'
  );
  importScripts(
    'https://www.gstatic.com/firebasejs/9.8.4/firebase-messaging-compat.js'
  );

  const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyBvxgz4krx7lkor3MBJXwCW0DMXUWpQFi4',
    authDomain: 'zelli-740a4.firebaseapp.com',
    projectId: 'zelli-740a4',
    storageBucket: 'zelli-740a4.appspot.com',
    messagingSenderId: '531858185893',
    appId: '1:531858185893:web:ae62fc267871a78811774c',
    measurementId: 'G-MD67YGW81M',

    vapidKey:
      'BBnnYtbvBAtvBiqBvtmGOZVAwpf9Mehd4ghrxf9fg3HPyl-uP-0ZNpYQWae5WRQiyNPIYhk7e3iYg22DrDETZdM',
  };

  firebase.initializeApp(FIREBASE_CONFIG);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
  });
}
