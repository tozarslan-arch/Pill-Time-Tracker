import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const dateInput = document.getElementById("historyDate");
const list = document.getElementById("historyList");

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  dateInput.addEventListener("change", async () => {
    const date = dateInput.value;
    if (!date) return;

    const logsRef = collection(db, "users", user.uid, "logs", date, "items");
    const snapshot = await getDocs(logsRef);

    list.innerHTML = "";

    snapshot.forEach((doc) => {
      const item = document.createElement("div");
      item.className = "pill-item";
      item.textContent = doc.data().name;
      list.appendChild(item);
    });
  });
});
