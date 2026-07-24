// js/parallax.js — Mouse-driven parallax depth layers + scroll parallax on hero bg

'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = 'ontouchstart' in window;

if (!reducedMotion) {

  // ── Mouse parallax on [data-parallax] elements ─────────────────
  if (!isTouch) {
    const layers = document.querySelectorAll('[data-parallax]');

    if (layers.length > 0) {
      let mouseX = 0, mouseY = 0;
      let smoothX = 0, smoothY = 0;
      let rafId = null;

      window.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      }, { passive: true });

      function updateParallax() {
        smoothX += (mouseX - smoothX) * 0.07;
        smoothY += (mouseY - smoothY) * 0.07;

        layers.forEach(layer => {
          const depth = parseFloat(layer.dataset.parallax) || 1;
          const x = smoothX * depth * 18;
          const y = smoothY * depth * 18;
          // Set CSS custom properties so the existing CSS transform
          // (which may include rotation) still applies correctly.
          layer.style.setProperty('--px', `${x}px`);
          layer.style.setProperty('--py', `${y}px`);
        });

        rafId = requestAnimationFrame(updateParallax);
      }

      updateParallax();
    }
  }

  // ── Scroll parallax: hero background glow ─────────────────────
  let scrollPending = false;

  function onScroll() {
    if (scrollPending) return;
    scrollPending = true;

    requestAnimationFrame(() => {
      const hero = document.getElementById('hero');
      if (hero) {
        const scrollY = window.scrollY;
        const heroH = hero.offsetHeight;
        const progress = Math.min(scrollY / heroH, 1);

        const bg = document.querySelector('.hero-bg-glow');
        if (bg) {
          bg.style.transform = `translateY(${progress * 72}px)`;
          bg.style.opacity = String(1 - progress * 0.55);
        }
      }

      scrollPending = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}
