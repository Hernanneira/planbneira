// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-dzBKS2H5b7Ll-iAmrOFborfefk6YqR8",
  authDomain: "planbneira.firebaseapp.com",
  projectId: "planbneira",
  storageBucket: "planbneira.appspot.com",
  messagingSenderId: "1078780696882",
  appId: "1:1078780696882:web:40c1fc3201daed553a9f2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)