import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


let currentUser = null;

// Redirect if not logged in
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    currentUser = user;
  }
});

const loadBtn = document.getElementById("loadHistoryBtn");
const historyResults = document.getElementById("historyResults");

loadBtn.addEventListener("click", async () => {
  const date = document.getElementById("historyDate").value;

  if (!date) {
    historyResults.innerHTML = `<p>Please select a date.</p>`;
    return;
  }

  const logRef = doc(db, "users", currentUser.uid, "logs", date);
  const logSnap = await getDoc(logRef);

  if (!logSnap.exists()) {
    historyResults.innerHTML = `
      <div class="card">
        <p>No records for this date.</p>
      </div>
    `;
    return;
  }

  const data = logSnap.data();

  historyResults.innerHTML = "";

  Object.keys(data).forEach(key => {
    const taken = data[key];
    const [time, pillName] = key.split("-");

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="pill-name">${pillName}</div>
      <div class="pill-time">${time}</div>
      <div class="history-status ${taken ? "taken" : "not-taken"}">
        ${taken ? "✔ Taken" : "✘ Not Taken"}
      </div>
    `;

    historyResults.appendChild(card);
  });
});

// Back button
document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "today.html";
});
