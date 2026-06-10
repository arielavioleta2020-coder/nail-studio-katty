import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJ4hy8a6n4cdAyREnF-AMClT-5hu-dBaA",
  authDomain: "nail-studio-katty.firebaseapp.com",
  projectId: "nail-studio-katty",
  storageBucket: "nail-studio-katty.firebasestorage.app",
  messagingSenderId: "399623948868",
  appId: "1:399623948868:web:90096b7d7f9f62d13f4a11"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);