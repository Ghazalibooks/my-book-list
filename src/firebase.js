import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore importieren

const firebaseConfig = {
  apiKey: "AIzaSyCJS7twiAm9Wp5LkOuJKCSQl8xi0SD1t7E",
  authDomain: "ghazalibooklistapp.firebaseapp.com",
  projectId: "ghazalibooklistapp",
  storageBucket: "ghazalibooklistapp.appspot.com",
  messagingSenderId: "1090094989131",
  appId: "1:1090094989131:web:32d2f17937d00460b1b2ce",
  measurementId: "G-8JME6971T3"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore initialisieren
