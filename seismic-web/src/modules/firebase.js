import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD1q2WvZ1JRGqCyjKa4LylpzMfhyZuCDWU',
  authDomain: 'showintel-8dcf8.firebaseapp.com',
  databaseURL: 'https://showintel-8dcf8.firebaseio.com',
  projectId: 'showintel-8dcf8',
  storageBucket: 'showintel-8dcf8.appspot.com',
  messagingSenderId: '58581328267',
  appId: '1:58581328267:web:49b2e8b62825a148648f8e',
  measurementId: 'G-214P1FQBKT',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth(firebaseApp);
export const db = firebase.firestore(firebaseApp);
export const analytics = firebase.analytics(firebaseApp);
