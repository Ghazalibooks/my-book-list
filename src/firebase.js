// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Makes sure the auth function is imported
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJS7twiAm9Wp5LkOuJKCSQl8xi0SD1t7E",
  authDomain: "ghazalibooklistapp.firebaseapp.com",
  projectId: "ghazalibooklistapp",
  storageBucket: "ghazalibooklistapp.appspot.com",
  messagingSenderId: "1090094989131",
  appId: "1:1090094989131:web:32d2f17937d00460b1b2ce",
  measurementId: "G-8JME6971T3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore services
const auth = getAuth(app);
const db = getFirestore(app);

// Export both 'auth' and 'db' so other files like App.js can use them
export { auth, db };
