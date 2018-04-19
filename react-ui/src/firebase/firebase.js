import * as firebase from 'firebase';

const admin = require('firebase-admin');

const serviceAccount = require('../service-account-key.json');

const config = {
  apiKey: 'AIzaSyDOY55XaKID0G9EuPr2ijexwe0_scPX1Hk',
  authDomain: 'trains-635b2.firebaseapp.com',
  databaseURL: 'https://trains-635b2.firebaseio.com',
  projectId: 'trains-635b2',
  storageBucket: 'trains-635b2.appspot.com',
  messagingSenderId: '756876626177',
  credential: admin.credential.cert(serviceAccount)
};
firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
