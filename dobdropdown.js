// Set max date to exactly 18 years ago from today
document.addEventListener("DOMContentLoaded", () => {
  const dobInput = document.getElementById("dobCalendar");

  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const formattedMax = maxDate.toISOString().split("T")[0];

  dobInput.max = formattedMax;

  // Optional: set a minimum date (e.g., 100 years ago)
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
  const formattedMin = minDate.toISOString().split("T")[0];
  dobInput.min = formattedMin;

  // Load saved date if available
  const saved = localStorage.getItem("dobCalendar");
  if (saved) dobInput.value = saved;
});

// Calculate age from calendar selection
function calculateAgeFromCalendar() {
  const input = document.getElementById("dobCalendar").value;
  const resultBox = document.getElementById("age-result");

  if (!input) {
    resultBox.innerHTML = "Please select your birth date.";
    return;
  }

  localStorage.setItem("dobCalendar", input);

  const dob = new Date(input);
  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  resultBox.innerHTML = `
    <strong>Your Age:</strong><br>
    ${years} Years, ${months} Months, ${days} Days
  `;
}
