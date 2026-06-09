/* AXION — micro-interactions (no deps, ~2KB) */
(() => {
  'use strict';

  // 1. Sticky nav: add class on scroll
  const nav = document.getElementById('nav');
  let lastY = 0, ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 20) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
    lastY = y; ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  // 2. Reveal on scroll (IntersectionObserver)
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          // Stagger if multiple reveal in same view
          setTimeout(() => e.target.classList.add('is-visible'), i * 60);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // 3. Animated counters
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const isInt = Number.isInteger(target);
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const val = target * eased;
      el.textContent = isInt
        ? Math.floor(val).toLocaleString()
        : val.toFixed(2);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = isInt ? target.toLocaleString() : target.toFixed(2);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  // 4. Smooth anchor scrolling (with offset for fixed nav)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // 5. Mobile menu toggle (basic)
  const burger = document.querySelector('.nav__burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
    });
  }
})();
