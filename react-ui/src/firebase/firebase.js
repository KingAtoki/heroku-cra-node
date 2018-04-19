import * as firebase from 'firebase';

var admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.cert('firebase-adminsdk-ydvtl@trains-635b2.iam.gserviceaccount.com'),
});

const config = {
    apiKey: "AIzaSyDOY55XaKID0G9EuPr2ijexwe0_scPX1Hk",
    authDomain: "trains-635b2.firebaseapp.com",
    databaseURL: "https://trains-635b2.firebaseio.com",
    projectId: "trains-635b2",
    storageBucket: "trains-635b2.appspot.com",
    messagingSenderId: "756876626177",

};


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};