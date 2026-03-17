import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "today.html";
    } catch (error) {
      document.getElementById("errorMsg").textContent = error.message;
    }
  });
}

// SIGNUP
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = signupForm.email.value.trim();
    const password = signupForm.password.value.trim();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "today.html";
    } catch (error) {
      document.getElementById("errorMsg").textContent = error.message;
    }
  });
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}

// REDIRECT LOGGED-IN USERS
onAuthStateChanged(auth, (user) => {
  const isAuthPage =
    location.pathname.includes("login") ||
    location.pathname.includes("signup") ||
    location.pathname.endsWith("/") ||
    location.pathname.includes("index");

  if (user && isAuthPage) {
    window.location.href = "today.html";
  }

  if (!user && !isAuthPage) {
    window.location.href = "login.html";
  }
});
