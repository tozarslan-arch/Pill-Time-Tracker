import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

// Load user info
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    userEmail.textContent = user.email;
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});
