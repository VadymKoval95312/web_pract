(function () {
  const root = document.documentElement;
  // код свитчера
  const modeButtons = Array.from(document.querySelectorAll('[data-set-mode]'));
  const STORAGE_KEY = 'latte_haven_mode';
  function setMode(mode) {
    root.dataset.mode = mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {
    }
    modeButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.setMode === mode);
    });
  }
  (function initMode() {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
    }
    if (saved === 'narrow' || saved === 'wide') {
      setMode(saved);
      return;
    }
    const initial = window.innerWidth <= 1000 ? 'narrow' : 'wide';
    setMode(initial);
  })();
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.setMode);
    });
  });
  // анімація при тику
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      target.scrollIntoView({
        behavior: scrollBehavior,
        block: 'start',
      });
      try {
        history.pushState(null, '', href);
      } catch (err) {
        location.hash = href;
      }
    });
  });
  // код карусєлі
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  if (!slides.length || !prevBtn || !nextBtn) return;
  // стартова фотка
  let activeIndex = 2;
  function applyPositions() {
    slides.forEach((slide, i) => {
      slide.classList.remove(
        'pos-center',
        'pos-left',
        'pos-right',
        'pos-far-left',
        'pos-far-right',
        'pos-hidden'
      );
      const offset = i - activeIndex;
      if (offset === 0) slide.classList.add('pos-center');
      else if (offset === -1) slide.classList.add('pos-left');
      else if (offset === 1) slide.classList.add('pos-right');
      else if (offset === -2) slide.classList.add('pos-far-left');
      else if (offset === 2) slide.classList.add('pos-far-right');
      else slide.classList.add('pos-hidden');
    });
  }
  function go(delta) {
    activeIndex = (activeIndex + delta + slides.length) % slides.length;
    applyPositions();
  }
  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', () => go(1));
  // гиц гиц на стрелки
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
  applyPositions();
})();