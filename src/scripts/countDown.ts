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

// Modal functionality
const ctaButton = document.getElementById('cta-button') as HTMLElement;
const modal = document.getElementById('newsletter-modal') as HTMLElement;
const closeModal = document.getElementById('close-modal') as HTMLElement;
const newsletterForm = document.getElementById('newsletter-form') as HTMLFormElement;

// Open modal when CTA button is clicked
ctaButton.addEventListener('click', () => {
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.querySelector('.modal-content')?.classList.remove('scale-95');
  modal.querySelector('.modal-content')?.classList.add('scale-100');
});

// Close modal when close button is clicked
closeModal.addEventListener('click', () => {
  closeModal.blur();
  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.querySelector('.modal-content')?.classList.remove('scale-100');
  modal.querySelector('.modal-content')?.classList.add('scale-95');
});

// Close modal when clicking outside modal content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('.modal-content')?.classList.remove('scale-100');
    modal.querySelector('.modal-content')?.classList.add('scale-95');
  }
});

// Handle form submission
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const name = (document.getElementById('name') as HTMLInputElement).value;

  // Here you would normally send this data to your server
  console.log(`Form submitted: ${name} (${email})`);

  // Replace form with success message
  newsletterForm.innerHTML = `
    <div class="text-center py-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      <h4 class="text-xl font-bold text-gray-800 mb-2">Merci de vous être inscrit!</h4>
      <p class="text-gray-600">Nous vous contacterons dès que notre site sera prêt.</p>
    </div>
  `;

  // Close modal after 3 seconds
  setTimeout(() => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('.modal-content')?.classList.remove('scale-100');
    modal.querySelector('.modal-content')?.classList.add('scale-95');
  }, 3000);
});

// Add subtle parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  const moveAmount = 10; // Max pixels to move
  document.querySelectorAll('h2').forEach(element => {
    (element as HTMLElement).style.transform = `translate(${x * moveAmount}px, ${y * moveAmount}px)`;
  });
});