import { supabase } from "./supabase.js";
supabase.auth.getUser().then(console.log);

async function loadProfile() {
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userEmail").textContent = user.email;
}

loadProfile();
