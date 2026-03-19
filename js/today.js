import { supabase } from "./supabase.js";

supabase.auth.getUser().then(console.log);

const pillList = document.getElementById("pillList");

async function loadTodayPills() {
  console.log("today.js version 4");

  // Get session instead of getUser()
  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData || !sessionData.session) {
    console.log("Session not ready, retrying...");
    setTimeout(loadTodayPills, 200);
    return;
  }

  const userId = sessionData.session.user.id;

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
