// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHyojznUJ2FTpf5F_dTS8i5iNb15Bs8RY",
    authDomain: "leafy-2b35f.firebaseapp.com",
    projectId: "leafy-2b35f",
    storageBucket: "leafy-2b35f.appspot.com",
    messagingSenderId: "373707227163",
    appId: "1:373707227163:web:1bbfcb17bf75f13cb238be",
    measurementId: "G-J6HWWQRX8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
