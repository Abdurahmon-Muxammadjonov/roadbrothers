document.addEventListener('DOMContentLoaded', () => {
  // Footer'dagi joriy yilni avtomatik qo'yish
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Video yuklanmasa/ijro bo'lmasa, poster rasm (yoki fallback fon) qoladi
  const truckVideo = document.querySelector('.truck-frame video');
  if (truckVideo) {
    truckVideo.addEventListener('error', () => {
      const frame = truckVideo.closest('.truck-frame');
      if (frame) frame.style.background = 'linear-gradient(160deg, var(--panel), var(--asphalt-2))';
      truckVideo.style.display = 'none';
    }, { once: true });

    // Ba'zi brauzerlar (ayniqsa mobil) autoplay'ni bloklashi mumkin —
    // shu holatda foydalanuvchi bosganda video ishga tushadi.
    const tryPlay = () => truckVideo.play().catch(() => {});
    tryPlay();
    document.addEventListener('click', tryPlay, { once: true });

    // Harakatga sezgir foydalanuvchilar uchun videoni to'xtatib, statik
    // poster rasmda qoldirish
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      truckVideo.pause();
      truckVideo.removeAttribute('loop');
    }
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
