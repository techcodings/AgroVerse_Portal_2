// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCortMHOXxR2hMvwnbMmz8AaBrQNeM0JJ0",
  authDomain: "agroverse-5bcf9.firebaseapp.com",
  projectId: "agroverse-5bcf9",
  storageBucket: "agroverse-5bcf9.firebasestorage.app",
  messagingSenderId: "661133143367",
  appId: "1:661133143367:web:4f65a996be0852d08e7062",
  measurementId: "G-VMJMXXTNTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, db, googleProvider };

