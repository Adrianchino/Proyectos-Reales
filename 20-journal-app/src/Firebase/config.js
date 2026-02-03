// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc17eZEc8-O7zfJcSUxY7fArlHOzaqmzg",
  authDomain: "react-cursos-72f98.firebaseapp.com",
  projectId: "react-cursos-72f98",
  storageBucket: "react-cursos-72f98.firebasestorage.app",
  messagingSenderId: "898325839649",
  appId: "1:898325839649:web:e79ba64f61924e91074860"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);

export const FireBaseAuth = getAuth( FireBaseApp );

export const FireBaseDB = getFirestore( FireBaseApp )