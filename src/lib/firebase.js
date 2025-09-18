// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9T8ema-clX46SAsVHMUvw0g7kDKP0WgA",
  authDomain: "sikkim-monastery-f428d.firebaseapp.com",
  projectId: "sikkim-monastery-f428d",
  storageBucket: "sikkim-monastery-f428d.appspot.com",
  messagingSenderId: "433402343182",
  appId: "1:433402343182:web:5075a4f3932d145a84b15f",
  measurementId: "G-6L42NPP7JZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth + Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
