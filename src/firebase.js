// src/firebase.js

// Importiere die nötigen Funktionen von den Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Dein persönlicher Konfigurations-Code von Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCJS7twiAm9Wp5LkOuJKCSQl8xi0SD1t7E",
  authDomain: "ghazalibooklistapp.firebaseapp.com",
  projectId: "ghazalibooklistapp",
  storageBucket: "ghazalibooklistapp.appspot.com",
  messagingSenderId: "1090094989131",
  appId: "1:1090094989131:web:32d2f17937d00460b1b2ce",
  measurementId: "G-8JME6971T3"
};

// Initialisiere Firebase
const app = initializeApp(firebaseConfig);

// Initialisiere die Firestore-Datenbank und exportiere sie,
// damit du sie in anderen Dateien deines Projekts (z.B. in App.js) verwenden kannst.
export const db = getFirestore(app);
