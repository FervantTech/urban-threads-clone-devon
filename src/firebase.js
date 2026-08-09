// Import the Firebase tools used by the app.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Connect this website to the Urban Threads Firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyDhAXDc0QQshvKWMag_uDVOsLNsk_5E80Q",
  authDomain: "urbanthreadsstore-devon.firebaseapp.com",
  projectId: "urbanthreadsstore-devon",
  storageBucket: "urbanthreadsstore-devon.firebasestorage.app",
  messagingSenderId: "568084210965",
  appId: "1:568084210965:web:b1a36c968ea1bcd7baf51c",
  measurementId: "G-0DJ4XQMNYR",
};

// Start Firebase, then export Authentication and Firestore for other files.
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
