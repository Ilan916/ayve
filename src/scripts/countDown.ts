// Set the countdown target date - 30 days from now
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 30);

// Update countdown timer
function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate.getTime() - now;

  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result
  const daysElement = document.getElementById("days")?.querySelector(".digit");
  if (daysElement) {
    daysElement.textContent = days.toString().padStart(2, '0');
  }
  const hoursElement = document.getElementById("hours")?.querySelector(".digit");
  if (hoursElement) {
    hoursElement.textContent = hours.toString().padStart(2, '0');
  }
  const minutesElement = document.getElementById("minutes")?.querySelector(".digit");
  if (minutesElement) {
    minutesElement.textContent = minutes.toString().padStart(2, '0');
  }
  const secondsDigitElement = document.getElementById("seconds")?.querySelector(".digit");
  if (secondsDigitElement) {
    secondsDigitElement.textContent = seconds.toString().padStart(2, '0');
  }

  // Add flip animation to seconds
  const secondsElement = document.getElementById("seconds")?.querySelector(".digit");
  if (seconds % 2 === 0) {
    secondsElement?.classList.add("flip");
  } else {
    secondsElement?.classList.remove("flip");
  }
}

// Update immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);