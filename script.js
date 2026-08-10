document.addEventListener('DOMContentLoaded', () => {
  // Footer'dagi joriy yilni avtomatik qo'yish
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Rasm yuklanmasa, chiroyli fallback fon ko'rsatish
  const truckImg = document.querySelector('.truck-frame img');
  if (truckImg) {
    truckImg.addEventListener('error', () => {
      const frame = truckImg.closest('.truck-frame');
      if (frame) frame.style.background = 'linear-gradient(160deg, var(--panel), var(--asphalt-2))';
      truckImg.style.display = 'none';
    }, { once: true });
  }

  // Telegram tugmasini bosganda kichik "pulse" effekt
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      ctaBtn.classList.remove('pulse');
      void ctaBtn.offsetWidth; // reflow — animatsiyani qayta ishga tushirish uchun
      ctaBtn.classList.add('pulse');
    });
  }

  // Bo'limlarni ekranga kirganda ketma-ket (stagger) paydo bo'lish animatsiyasi
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = revealEls.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 90}ms`;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      }, { threshold: 0.15 });

      revealEls.forEach((el) => io.observe(el));
    } else {
      // IntersectionObserver qo'llab-quvvatlanmasa, hammasini darhol ko'rsatish
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  }
});
