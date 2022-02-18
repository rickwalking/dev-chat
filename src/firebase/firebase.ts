import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: 'd',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
};
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

export default firebase;
