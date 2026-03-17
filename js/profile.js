import { auth } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const emailField = document.getElementById("userEmail");

onAuthStateChanged(auth, (user) => {
  if (user) {
    emailField.textContent = user.email;
  }
});
