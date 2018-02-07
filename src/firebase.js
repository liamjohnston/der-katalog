
import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyA0Q1zIInEbMQS0R0cO9_X0ttj9F6jz2Dw',
  authDomain: 'der-katalog.firebaseapp.com',
  databaseURL: 'https://der-katalog.firebaseio.com',
  projectId: 'der-katalog',
  storageBucket: 'der-katalog.appspot.com',
  messagingSenderId: '959310392943'
});

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

const base = Rebase.createClass(app.database());

export default base;
