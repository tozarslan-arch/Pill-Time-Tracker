import { auth, db } from "./firebase.js";
import { 
  collection, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Redirect if not logged in
let currentUser = null;
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    currentUser = user;
    addTimeField(); // Start with one time field
  }
});

const timesContainer = document.getElementById("timesContainer");
const addTimeBtn = document.getElementById("addTimeBtn");
const savePillBtn = document.getElementById("savePillBtn");
const saveMsg = document.getElementById("saveMsg");

// Add a new time input
function addTimeField() {
  const wrapper = document.createElement("div");
  wrapper.className = "time-row";

  wrapper.innerHTML = `
    <input type="time" class="input time-input">
  `;

  timesContainer.appendChild(wrapper);
}

addTimeBtn.addEventListener("click", addTimeField);

// Save pill to Firestore
savePillBtn.addEventListener("click", async () => {
  const name = document.getElementById("pillName").value.trim();
  const dosage = document.getElementById("pillDosage").value.trim();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  const timeInputs = document.querySelectorAll(".time-input");
  const times = [...timeInputs].map(t => t.value).filter(v => v);

  if (!name || times.length === 0 || !startDate) {
    saveMsg.textContent = "Please fill pill name, at least one time, and start date.";
    saveMsg.style.color = "red";
    return;
  }

  await addDoc(collection(db, "users", currentUser.uid, "pills"), {
    name,
    dosage,
    times,
    startDate,
    endDate: endDate || null
  });

  saveMsg.textContent = "Pill saved!";
  saveMsg.style.color = "green";

  // Clear form
  document.getElementById("pillName").value = "";
  document.getElementById("pillDosage").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  timesContainer.innerHTML = "";
  addTimeField();
});

// Back button
document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "today.html";
});
