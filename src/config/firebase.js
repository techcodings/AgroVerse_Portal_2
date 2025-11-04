// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATlbYgcim7EdgiS3fnG8OOaz0BTLFr-pQ",
  authDomain: "energyverse-628d4.firebaseapp.com",
  projectId: "energyverse-628d4",
  storageBucket: "energyverse-628d4.firebasestorage.app",
  messagingSenderId: "17456664303",
  appId: "1:17456664303:web:aa236197729b960639551a",
  measurementId: "G-4B8RRR6W61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, db, googleProvider };

