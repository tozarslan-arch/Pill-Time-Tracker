import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBPxT8nRj7eFwzpRwOYTJ_r_vAiT0u9Ssk",
  authDomain: "pill-time-tracker.firebaseapp.com",
  projectId: "pill-time-tracker",
  storageBucket: "pill-time-tracker.appspot.com",
  messagingSenderId: "1068914011666",
  appId: "1:1068914011666:web:90a7eeaee80e5b5063b2cb",
  measurementId: "G-TX72Q592LM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
