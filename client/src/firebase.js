// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2280f.firebaseapp.com",
  projectId: "mern-estate-2280f",
  storageBucket: "mern-estate-2280f.appspot.com",
  messagingSenderId: "589305295130",
  appId: "1:589305295130:web:86b39ad978f19513ff7ca3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);