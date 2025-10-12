// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFaJUvAPoW7MTnA4_KGO0LSLjkByl2GRk",
  authDomain: "jobseeker-962d3.firebaseapp.com",
  projectId: "jobseeker-962d3",
  storageBucket: "jobseeker-962d3.appspot.com",
  messagingSenderId: "364405823686",
  appId: "1:364405823686:web:200afa62522840e3019fc7",
  measurementId: "G-RR1ZQ65VCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {auth, googleProvider};
