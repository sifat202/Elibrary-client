// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi3hlnVlLOugfxQVAmxWk6ezqWr4_34oM",
  authDomain: "elibrary-d76cc.firebaseapp.com",
  projectId: "elibrary-d76cc",
  storageBucket: "elibrary-d76cc.firebasestorage.app",
  messagingSenderId: "628641355344",
  appId: "1:628641355344:web:2d6d2f492d1d401f332355",
  measurementId: "G-9X8GG7XZ01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);