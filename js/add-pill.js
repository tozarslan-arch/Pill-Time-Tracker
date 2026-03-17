import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const form = document.getElementById("addPillForm");

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const time = form.time.value;
    const start = form.start.value;
    const end = form.end.value;

    await addDoc(collection(db, "users", user.uid, "pills"), {
      name,
      time,
      start,
      end
    });

    alert("Pill saved!");
    window.location.href = "today.html";
  });
});
