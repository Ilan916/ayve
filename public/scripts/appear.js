// Animation utilitaire pour observer l'apparition à l'écran
export function observeAppear(selector = '.animate-on-scroll', options = {}) {
  const elements = document.querySelectorAll(selector);
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('appeared'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appeared');
        obs.unobserve(entry.target);
      }
    });
  }, options);
  elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  observeAppear();
});
