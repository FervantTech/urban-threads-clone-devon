// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhAXDc0QQshvKWMag_uDVOsLNsk_5E80Q",
  authDomain: "urbanthreadsstore-devon.firebaseapp.com",
  projectId: "urbanthreadsstore-devon",
  storageBucket: "urbanthreadsstore-devon.firebasestorage.app",
  messagingSenderId: "568084210965",
  appId: "1:568084210965:web:b1a36c968ea1bcd7baf51c",
  measurementId: "G-0DJ4XQMNYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);