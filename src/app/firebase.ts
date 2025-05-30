import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Hardcode the configuration temporarily for testing
// You should move these to environment variables in production
const firebaseConfig = {
  apiKey: "AIzaSyCkdN1OEWanIkrKMPYRvFTNNDQDVtEpFFw",
  authDomain: "d2tcode.firebaseapp.com",
  databaseURL: "https://d2tcode-default-rtdb.firebaseio.com",
  projectId: "d2tcode",
  storageBucket: "d2tcode.appspot.com",
  messagingSenderId: "1050127685381",
  appId: "1:1050127685381:web:a08d73ae4b74eb18de496c",
  measurementId: "G-JQVDFL43P2"
};

// Initialize Firebase
let app;
let auth;
let db;

// Initialize Firebase only on the client side
if (typeof window !== 'undefined') {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase initialization error", error);
  }
}

export { app, auth, db }; 