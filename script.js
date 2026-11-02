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

    // Videoni boshidan emas, o'rtasidan qisqa (~6s) segment sifatida
    // ijro qilish — asl faylni qayta kodlashsiz "qisqaroq" ko'rinish.
    // Muhim: sakrashni (currentTime) sahifa kirishi bilan DARHOL emas,
    // balki "canplaythrough" (yetarlicha buferlangan) hodisasida qilamiz —
    // aks holda hali hech narsa yuklanmagan joyga sakrab, video bir zum
    // "qotib" ko'rinardi. Shu vaqtgacha video oddiy 0-dan silliq davom etadi.
    const CLIP_START_RATIO = 0.35; // umumiy uzunlikning ~1/3 qismidan
    const CLIP_LENGTH = 6; // soniya

    truckVideo.addEventListener('canplaythrough', () => {
      const dur = truckVideo.duration;
      if (isFinite(dur) && dur > CLIP_LENGTH) {
        const start = Math.min(dur * CLIP_START_RATIO, dur - CLIP_LENGTH);
        truckVideo.dataset.clipStart = start;
        truckVideo.dataset.clipEnd = start + CLIP_LENGTH;
        truckVideo.currentTime = start;
      }
    }, { once: true });

    truckVideo.addEventListener('timeupdate', () => {
      const end = parseFloat(truckVideo.dataset.clipEnd);
      const start = parseFloat(truckVideo.dataset.clipStart);
      if (!isNaN(end) && truckVideo.currentTime >= end) {
        truckVideo.currentTime = start;
      }
    });

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

      // Meta Pixel'ga "Lead" hodisasini yuborish
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
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
