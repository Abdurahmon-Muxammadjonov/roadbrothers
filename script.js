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

  // Bo'limlar sahifa ochilishi bilan ketma-ket (stagger) paydo bo'ladi —
  // scroll kutilmaydi, shuning uchun rasm va boshqa hammasi telefonda
  // darhol ko'rinadi.
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  revealEls.forEach((el, idx) => {
    el.style.transitionDelay = `${idx * 70}ms`;
    requestAnimationFrame(() => el.classList.add('is-visible'));
  });
});
