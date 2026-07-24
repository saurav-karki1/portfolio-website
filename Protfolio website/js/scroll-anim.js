// js/scroll-anim.js — Scroll-driven entrance animations + hero load entrance

'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Hero entrance on page load ─────────────────────────────────
// Triggers CSS transitions by adding .visible class to hero elements.
function triggerHeroEntrance() {
  const targets = [
    '.hero__eyebrow',
    '.hero__title',
    '.hero__sub',
    '.hero__desc',
    '.hero__cta',
    '.hero__photo-wrapper',
  ];

  targets.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (!el) return;

    if (reducedMotion) {
      el.classList.add('visible');
      return;
    }

    setTimeout(() => el.classList.add('visible'), 80 + i * 60);
  });
}

// ── [data-reveal] scroll observer ─────────────────────────────
function initRevealObserver() {
  if (reducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

// ── Animated counters ──────────────────────────────────────────
function animateCounter(el, target, duration = 1400) {
  if (reducedMotion) {
    el.textContent = target + (el.dataset.countSuffix || '');
    return;
  }

  const suffix = el.dataset.countSuffix || '';
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function initCounters() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (!isNaN(target)) animateCounter(el, target);
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}

// ── Init ───────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    triggerHeroEntrance();
    initRevealObserver();
    initCounters();
  });
} else {
  triggerHeroEntrance();
  initRevealObserver();
  initCounters();
}
