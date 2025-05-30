import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration that matches your static files
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
    // Check if Firebase is already initialized in window object (from static HTML)
    if (typeof window.firebase !== 'undefined') {
      console.log("Found window.firebase, checking if initialized...");
      
      // Check if Firebase app has been initialized
      if (!window.firebase.apps || !window.firebase.apps.length) {
        console.log("Initializing Firebase app from bridge");
        window.firebase.initializeApp(firebaseConfig);
      } else {
        console.log("Firebase app already initialized");
      }
      
      // Now use the global firebase object's auth and firestore
      auth = window.firebase.auth();
      db = window.firebase.firestore();
    } else {
      // Initialize using modern SDK
      console.log("No window.firebase found, initializing modern Firebase SDK");
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
      
      // Create compatibility layer for static pages
      window.firebase = {
        auth: () => auth,
        firestore: () => db,
        apps: [app],
        initializeApp: () => app
      };
    }
  } catch (error) {
    console.error("Firebase initialization error", error);
  }
}

// Bridge functions that work with both approaches
const signIn = async (email, password) => {
  if (typeof window !== 'undefined') {
    try {
      // Try to ensure Firebase is initialized
      if (typeof window.firebase !== 'undefined') {
        if (!window.firebase.apps || !window.firebase.apps.length) {
          console.log("Initializing Firebase before signIn");
          window.firebase.initializeApp(firebaseConfig);
        }
        // Use global firebase object
        return window.firebase.auth().signInWithEmailAndPassword(email, password);
      } else if (auth) {
        // Use modern SDK
        return signInWithEmailAndPassword(auth, email, password);
      } else {
        throw new Error("Firebase authentication is not available");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  } else {
    throw new Error("Cannot sign in on server side");
  }
};

const createAccount = async (email, password) => {
  if (typeof window !== 'undefined') {
    try {
      // Try to ensure Firebase is initialized
      if (typeof window.firebase !== 'undefined') {
        if (!window.firebase.apps || !window.firebase.apps.length) {
          console.log("Initializing Firebase before createAccount");
          window.firebase.initializeApp(firebaseConfig);
        }
        // Use global firebase object
        return window.firebase.auth().createUserWithEmailAndPassword(email, password);
      } else if (auth) {
        // Use modern SDK
        return createUserWithEmailAndPassword(auth, email, password);
      } else {
        throw new Error("Firebase authentication is not available");
      }
    } catch (error) {
      console.error("Create account error:", error);
      throw error;
    }
  } else {
    throw new Error("Cannot create account on server side");
  }
};

const authStateChanged = (callback) => {
  if (typeof window !== 'undefined') {
    try {
      // Try to ensure Firebase is initialized
      if (typeof window.firebase !== 'undefined') {
        if (!window.firebase.apps || !window.firebase.apps.length) {
          console.log("Initializing Firebase before authStateChanged");
          window.firebase.initializeApp(firebaseConfig);
        }
        // Use global firebase object
        return window.firebase.auth().onAuthStateChanged(callback);
      } else if (auth) {
        // Use modern SDK
        return onAuthStateChanged(auth, callback);
      } else {
        console.warn("Firebase authentication is not available for auth state monitoring");
        return () => {}; // Return no-op function
      }
    } catch (error) {
      console.error("Auth state change error:", error);
      return () => {}; // Return no-op function on error
    }
  }
  return () => {}; // Return a no-op unsubscribe function
};

export { app, auth, db, signIn, createAccount, authStateChanged }; 