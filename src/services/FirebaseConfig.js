// src/services/FirebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Add this line

const firebaseConfig = {
  apiKey: 'AIzaSyAYngPpJc9rxtqi0FQNrKdk-SjvlXekG9I',
  authDomain: 'shopsavvy-9c9f9.firebaseapp.com',
  projectId: 'shopsavvy-9c9f9',
  storageBucket: 'shopsavvy-9c9f9.appspot.com', // Ensure the storage bucket is correct
  messagingSenderId: '43390731801',
  appId: '1:43390731801:web:d90d0c17cf6b55ca684c88',
  measurementId: 'G-JE55HKE01C',
  databaseURL: 'https://shopsavvy-9c9f9-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app); // Initialize storage

export { app, auth, db, analytics, database, storage };
