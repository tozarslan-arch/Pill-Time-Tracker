import { supabase } from "./supabase.js";

// -----------------------------
// AUTO‑HIGHLIGHT ACTIVE NAV ITEM
// -----------------------------
const currentPage = location.pathname.split("/").pop();

document.querySelectorAll(".bottom-nav a").forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// -----------------------------
// LOGOUT HANDLER (if button exists)
// -----------------------------
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  });
}
