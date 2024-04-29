// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_n_5IK0QQYLo9I836n9bwcloEBeyueS4",
  authDomain: "olx-clone-b3aae.firebaseapp.com",
  projectId: "olx-clone-b3aae",
  storageBucket: "olx-clone-b3aae.appspot.com",
  messagingSenderId: "390992721893",
  appId: "1:390992721893:web:9465216507f111ad2b610c",
  measurementId: "G-Z61CQX0FXQ",
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
// const getAnalytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
