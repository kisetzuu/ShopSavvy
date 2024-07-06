<<<<<<< HEAD
// src/services/FirebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
=======
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
>>>>>>> 740de9a5326cd4e28c7f2dfc0b12e95d58398129

const firebaseConfig = {
  apiKey: 'AIzaSyAYngPpJc9rxtqi0FQNrKdk-SjvlXekG9I',
  authDomain: 'shopsavvy-9c9f9.firebaseapp.com',
  projectId: 'shopsavvy-9c9f9',
  storageBucket: 'shopsavvy-9c9f9.appspot.com',
  messagingSenderId: '43390731801',
  appId: '1:43390731801:web:d90d0c17cf6b55ca684c88',
  measurementId: 'G-JE55HKE01C',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
<<<<<<< HEAD
const db = getFirestore(app);

export { app, auth, db };
=======
const analytics = getAnalytics(app);
const fs = getFirestore(app)

export {app, auth, analytics, fs};
>>>>>>> 740de9a5326cd4e28c7f2dfc0b12e95d58398129
