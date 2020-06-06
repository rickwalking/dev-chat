import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyAGkDilwaAvB1y4CF8MU9tlAGojyxCF59k',
    authDomain: 'dev-chat-5a51b.firebaseapp.com',
    databaseURL: 'https://dev-chat-5a51b.firebaseio.com',
    projectId: 'dev-chat-5a51b',
    storageBucket: 'dev-chat-5a51b.appspot.com',
    messagingSenderId: '801662984748',
    appId: '1:801662984748:web:265eda1200cb84cb9a6789',
    measurementId: 'G-90RFKDK5RP',
};
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

export default firebase;
