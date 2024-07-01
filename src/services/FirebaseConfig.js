// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYngPpJc9rxtqi0FQNrKdk-SjvlXekG9I",
  authDomain: "shopsavvy-9c9f9.firebaseapp.com",
  projectId: "shopsavvy-9c9f9",
  storageBucket: "shopsavvy-9c9f9.appspot.com",
  messagingSenderId: "43390731801",
  appId: "1:43390731801:web:d90d0c17cf6b55ca684c88",
  measurementId: "G-JE55HKE01C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {app, auth, analytics};