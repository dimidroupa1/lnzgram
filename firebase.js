import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4FzMGsX7oN5sxtsqKIrZPWoRXBI5y7_c",
    authDomain: "instagram-clone-48830.firebaseapp.com",
    projectId: "instagram-clone-48830",
    storageBucket: "instagram-clone-48830.appspot.com",
    messagingSenderId: "672567022132",
    appId: "1:672567022132:web:e7a462649a5878a825f061"
  };
const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
const db = firebase.firestore();
const storage = firebase.storage();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, app, storage };