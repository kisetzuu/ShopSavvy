// src/services/FirebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAYngPpJc9rxtqi0FQNrKdk-SjvlXekG9I',
  authDomain: 'shopsavvy-9c9f9.firebaseapp.com',
  projectId: 'shopsavvy-9c9f9',
  storageBucket: 'shopsavvy-9c9f9.appspot.com',
  messagingSenderId: '43390731801',
  appId: '1:43390731801:web:d90d0c17cf6b55ca684c88',
  measurementId: 'G-JE55HKE01C',
  databaseURL: 'https://shopsavvy-9c9f9-default-rtdb.asia-southeast1.firebasedatabase.app', // Correct database URL
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Initialize Realtime Database

export { app, auth, db, analytics, database };
