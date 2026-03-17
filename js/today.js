import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const pillsRef = collection(db, "users", user.uid, "pills");
  const snapshot = await getDocs(pillsRef);

  const list = document.getElementById("todayList");
  list.innerHTML = "";

  snapshot.forEach((doc) => {
    const pill = doc.data();
    const item = document.createElement("div");
    item.className = "pill-item";
    item.textContent = `${pill.name} — ${pill.time}`;
    list.appendChild(item);
  });
});
