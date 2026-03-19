import { supabase } from "./supabase.js";

const pillList = document.getElementById("pillList");

async function loadTodayPills() {
  // Wait for auth session to be ready
  const { data: userData } = await supabase.auth.getUser();

  if (!userData || !userData.user) {
    console.log("Auth not ready, retrying...");
    setTimeout(loadTodayPills, 200);
    return;
  }

  const userId = userData.user.id;

  const { data: pills, error } = await supabase
    .from("pills")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return;
  }

  const today = new Date();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][today.getDay()];
  const todayDate = today.toISOString().split("T")[0];

  const todayPills = [];

  pills.forEach(pill => {
    const isCorrectDay = pill.days.includes(weekday);
    const isAfterStart = !pill.start_date || pill.start_date <= todayDate;
    const isBeforeEnd = !pill.end_date || pill.end_date >= todayDate;

    if (isCorrectDay && isAfterStart && isBeforeEnd) {
      pill.times.forEach(time => {
        todayPills.push({
          id: pill.id,
          name: pill.name,
          dosage: pill.dosage,
          time
        });
      });
    }
  });

  renderPills(todayPills);
}

function renderPills(list) {
  pillList.innerHTML = "";

  if (list.length === 0) {
    pillList.innerHTML = "<p>No pills scheduled for today.</p>";
    return;
  }

  list.sort((a, b) => a.time.localeCompare(b.time));

  list.forEach(pill => {
    const div = document.createElement("div");
    div.classList.add("pill-card");

    div.innerHTML = `
      <div class="pill-info">
        <h3>${pill.name}</h3>
        <p>${pill.dosage || ""}</p>
        <p><strong>${pill.time}</strong></p>
      </div>
      <button class="taken-btn" data-id="${pill.id}" data-time="${pill.time}">
        Taken!
      </button>
    `;

    pillList.appendChild(div);
  });
}

loadTodayPills();
