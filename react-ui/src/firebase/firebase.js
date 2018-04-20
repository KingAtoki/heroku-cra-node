import * as firebase from 'firebase';

import * as admin from 'firebase-admin';

import serviceAccount from '../service-account-key.json';

const config = {
  databaseURL: 'https://trains-635b2.firebaseio.com',
  credential: admin.cert(serviceAccount)
};
firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
