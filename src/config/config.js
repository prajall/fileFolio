import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_WvPW6DNMTUkRa-Wrm_zDhu1N1oQxX1s",
  authDomain: "filefolio-d4e7b.firebaseapp.com",
  projectId: "filefolio-d4e7b",
  storageBucket: "filefolio-d4e7b.appspot.com",
  messagingSenderId: "674083331992",
  appId: "1:674083331992:web:ee90655a49318ece0e95ed",
  measurementId: "G-B71KH634P7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
