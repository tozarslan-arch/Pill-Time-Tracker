import { supabase } from "./supabase.js";

// Add time input dynamically
document.getElementById("add-time-btn").addEventListener("click", () => {
  const timeList = document.getElementById("time-list");

  const wrapper = document.createElement("div");
  wrapper.classList.add("time-row");

  const timeInput = document.createElement("input");
  timeInput.type = "time";
  timeInput.required = true;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.type = "button";
  removeBtn.classList.add("remove-time-btn");

  removeBtn.addEventListener("click", () => wrapper.remove());

  wrapper.appendChild(timeInput);
  wrapper.appendChild(removeBtn);
  timeList.appendChild(wrapper);
});

// Save pill
document.getElementById("save-pill-btn").addEventListener("click", async () => {
  const name = document.getElementById("pill-name").value.trim();
  const dosage = document.getElementById("pill-dosage").value.trim();

  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value || null;

  const days = [...document.querySelectorAll(".days-grid input:checked")]
    .map(cb => cb.value);

  const times = [...document.querySelectorAll("#time-list input[type='time']")]
    .map(t => t.value);

  if (!name || days.length === 0 || times.length === 0) {
    alert("Please fill all required fields.");
    return;
  }

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user.id;

  const { error } = await supabase
    .from("pills")
    .insert({
      user_id: userId,
      name,
      dosage,
      days,
      times,
      start_date: startDate,
      end_date: endDate
    });

  if (error) {
    console.error(error);
    alert("Error saving pill.");
  } else {
    window.location.href = "today.html";
  }
});
