// src/services/FirebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

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
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };
