import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  appId: "1:1068914011666:web:90a7eeaee80e5b5063b2cb",
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
