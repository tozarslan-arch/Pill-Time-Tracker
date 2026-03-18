import { supabase } from "./supabase.js";

// -----------------------------
// SIGNUP
// -----------------------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = signupForm.email.value.trim();
    const password = signupForm.password.value.trim();

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      document.getElementById("errorMsg").textContent = error.message;
      return;
    }

    // Supabase creates the user immediately
    window.location.href = "today.html";
  });
}

// -----------------------------
// LOGIN
// -----------------------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      document.getElementById("errorMsg").textContent = error.message;
      return;
    }

    window.location.href = "today.html";
  });
}

// -----------------------------
// LOGOUT
// -----------------------------
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  });
}

// -----------------------------
// AUTH STATE PROTECTION
// -----------------------------
supabase.auth.onAuthStateChange((event, session) => {
  const isAuthPage =
    location.pathname.includes("login") ||
    location.pathname.includes("signup") ||
    location.pathname.endsWith("/") ||
    location.pathname.includes("index");

  if (!session && !isAuthPage) {
    // Not logged in → redirect to login
    window.location.href = "login.html";
  }

  if (session && isAuthPage) {
    // Already logged in → redirect to today
    window.location.href = "today.html";
  }
});
