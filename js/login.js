import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const errorMsg = document.getElementById("errorMsg");

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "today.html"; // redirect to main app
    })
    .catch(err => {
      errorMsg.textContent = err.message;
    });
});

signupBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "today.html";
    })
    .catch(err => {
      errorMsg.textContent = err.message;
    });
});
