// js/tilt.js — 3D perspective tilt + shine spotlight on skill & project cards

'use strict';

if (!('ontouchstart' in window)) {

  const TILT_MAX = 8; // Max rotation degrees

  function initTiltCard(card) {
    const shine = card.querySelector('.skill-card__shine, .work-card__shine');

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let rafId = null;
    let isHovered = false;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
      if (!isHovered && Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01) {
        card.style.transform = '';
        rafId = null;
        return;
      }

      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);

      card.style.transform = `
        perspective(1000px)
        rotateX(${currentY}deg)
        rotateY(${currentX}deg)
        scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)
      `;

      if (shine) {
        const nx = ((targetX / TILT_MAX) + 1) / 2 * 100;
        const ny = ((-targetY / TILT_MAX) + 1) / 2 * 100;
        card.style.setProperty('--mouse-x', `${nx}%`);
        card.style.setProperty('--mouse-y', `${ny}%`);
      }

      rafId = requestAnimationFrame(tick);
    }

    function startLoop() {
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top)  / rect.height - 0.5;

      targetX =  relX * TILT_MAX * 2;
      targetY = -relY * TILT_MAX * 2;

      isHovered = true;
      startLoop();
    });

    card.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      isHovered = false;
      startLoop();
    });
  }

  function initAllTiltCards() {
    document.querySelectorAll('.skill-card, .work-card').forEach(initTiltCard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllTiltCards);
  } else {
    initAllTiltCards();
  }
}
