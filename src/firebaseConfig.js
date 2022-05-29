import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyC9gsZdjGmnjCjAC4HlGe_RAEFWrgbXB5k",
  authDomain: "task-a77de.firebaseapp.com",
  projectId: "task-a77de",
  storageBucket: "task-a77de.appspot.com",
  messagingSenderId: "105081973435",
  appId: "1:105081973435:web:681ded73a89ba1954e579e",
  measurementId: "G-HMSVDP6Q8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);