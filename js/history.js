import { supabase } from "./supabase.js";

const historyList = document.getElementById("historyList");

async function loadHistory() {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user.id;

  const { data: pills, error } = await supabase
    .from("pills")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return;
  }

  renderHistory(pills);
}

function renderHistory(pills) {
  historyList.innerHTML = "";

  if (pills.length === 0) {
    historyList.innerHTML = "<p>No pill history yet.</p>";
    return;
  }

  pills.forEach(pill => {
    const div = document.createElement("div");
    div.classList.add("history-card");

    div.innerHTML = `
      <h3>${pill.name}</h3>
      <p>${pill.dosage || ""}</p>

      <p><strong>Days:</strong> ${pill.days.join(", ")}</p>
      <p><strong>Times:</strong> ${pill.times.join(", ")}</p>

      <p><strong>Start:</strong> ${pill.start_date}</p>
      <p><strong>End:</strong> ${pill.end_date || "Ongoing"}</p>
    `;

    historyList.appendChild(div);
  });
}

loadHistory();
