import { supabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Add Pill page loaded");

  const addTimeBtn = document.getElementById("add-time-btn");
  const saveBtn = document.getElementById("save-pill-btn");

  addTimeBtn.addEventListener("click", () => {
    console.log("Add time clicked");

    const timeList = document.getElementById("time-list");

    const wrapper = document.createElement("div");
    wrapper.classList.add("time-row");

    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.required = true;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.type = "button";

    removeBtn.addEventListener("click", () => wrapper.remove());

    wrapper.appendChild(timeInput);
    wrapper.appendChild(removeBtn);
    timeList.appendChild(wrapper);
  });

  saveBtn.addEventListener("click", async () => {
    console.log("Save clicked");

    const name = document.getElementById("pill-name").value.trim();
    const dosage = document.getElementById("pill-dosage").value.trim();
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value || null;
const days = [...document.querySelectorAll(".days-grid input:checked")]
  .map(cb => cb.value);

const times = [...document.querySelectorAll("#time-list input[type='time']")]
  .map(t => t.value);


    const days = [...document.querySelectorAll(".days-grid input:checked")]
      .map(cb => cb.value);

    const times = [...document.querySelectorAll("#time-list input[type='time']")]
      .map(t => t.value);

    console.log("Collected days:", days);
    console.log("Collected times:", times);

    if (!name || days.length === 0 || times.length === 0) {
      alert("Please fill all required fields.");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      alert("User not logged in.");
      return;
    }

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
      console.error("Supabase insert error:", error);
      alert("Error saving pill.");
    } else {
      console.log("Pill saved successfully");
      window.location.href = "today.html";
    }
  });
});
