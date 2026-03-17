import { auth, db } from "./firebase.js";
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Redirect if not logged in
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadTodayPills(user.uid);
  }
});

const pillList = document.getElementById("pillList");

// Get today's date key
function getTodayKey() {
  const d = new Date();
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
}

async function loadTodayPills(userId) {
  pillList.innerHTML = "<p>Loading...</p>";

  const pillsRef = collection(db, "users", userId, "pills");
  const snapshot = await getDocs(pillsRef);

  pillList.innerHTML = "";

  snapshot.forEach(docSnap => {
    const pill = docSnap.data();

    pill.times.forEach(time => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="pill-name">${pill.name}</div>
        <div class="pill-time">${time}</div>
        <button class="taken-btn" data-pill="${pill.name}" data-time="${time}">
          Taken!
        </button>
      `;

      pillList.appendChild(card);
    });
  });

  attachTakenHandlers(userId);
}

function attachTakenHandlers(userId) {
  const buttons = document.querySelectorAll(".taken-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const pillName = btn.dataset.pill;
      const time = btn.dataset.time;

      const logKey = `${time}-${pillName}`;
      const todayKey = getTodayKey();

      await setDoc(
        doc(db, "users", userId, "logs", todayKey),
        { [logKey]: true },
        { merge: true }
      );

      btn.textContent = "✔ Taken";
      btn.style.background = "#2E7D32";
      btn.style.opacity = "0.9";
    });
  });
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});
