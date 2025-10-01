// Compte animé pour les stats
export function animateNumbers(selector = '.stat-animate', duration = 1200) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    const target = parseFloat(el.dataset.target || el.textContent);
    if (isNaN(target)) return;
    let start = 0;
    const isInt = Number.isInteger(target);
    const stepTime = Math.max(10, duration / target);
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      let progress = Math.min(elapsed / duration, 1);
      let value = progress * target;
      el.textContent = isInt ? Math.round(value) : value.toFixed(1);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = isInt ? target : target.toFixed(1);
      }
    }
    requestAnimationFrame(update);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Lance l'animation quand les stats sont visibles
  const stats = document.querySelectorAll('.stat-animate');
  if ('IntersectionObserver' in window && stats.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers('.stat-animate');
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    stats.forEach(el => obs.observe(el));
  } else {
    animateNumbers('.stat-animate');
  }
});
