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

  //   initializeFirebaseCloudMessaging();

  //   enableBackGroundMessages();

  //   function initializeFirebaseCloudMessaging() {
  const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyD3n-pKkHumsQnVovVgf_FpEBYbKKWDhx8',
    authDomain: 'zelli-local.firebaseapp.com',
    projectId: 'zelli-local',
    storageBucket: 'zelli-local.appspot.com',
    messagingSenderId: '308279147291',
    appId: '1:308279147291:web:ffddaba7cfdfb3b39cf1be',
    measurementId: 'G-WH4LC8SL31',

    vapidKey:
      'BKu5WfJU0SoDOojTZ0b-tUIZbOBQK9pNsVKDiySdTPMd-8e2sSoYKT_ee10jR86hWgTTl10XsFBXJZenGfsng3w',
  };

  firebase.initializeApp(FIREBASE_CONFIG);
  const messaging = firebase.messaging();
  //   }

  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
  });

  messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: 'assets/icons/icon-152x152.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  //   function enableBackGroundMessages() {
  //     messaging.setBackgroundMessageHandler((payload) => {
  //       const notificationOptions = {
  //         body: payload.message,
  //         icon: "assets/icons/icon-152x152.png",
  //       };
  //       return self.registration.showNotification(
  //         "Morphistic",
  //         notificationOptions
  //       );
  //     });
  //   }
}
