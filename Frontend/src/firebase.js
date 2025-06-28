// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "capstone-d73ca.firebaseapp.com",
  projectId: "capstone-d73ca",
  storageBucket: "capstone-d73ca.firebasestorage.app",
  messagingSenderId: "487568669829",
  appId: "1:487568669829:web:75d1b0fbbb07da29503dec",
  measurementId: "G-63V7YR342B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()

export  default app