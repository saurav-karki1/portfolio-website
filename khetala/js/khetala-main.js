/* Hallmark · shape: settled · genre: modern-minimal · theme: Khetala Ledger (bespoke) · v2.0.0
 * khetala-main.js — Interactive behaviour: nav, accordions, copy-checksum, smooth scroll */
'use strict';

/* ═══════════════════════════════════════════════════════
   1. MOBILE NAVIGATION HAMBURGER
════════════════════════════════════════════════════════*/
function initNav() {
  const btn = document.querySelector('[data-hamburger]');
  const drawer = document.querySelector('.kh-nav__drawer');
  if (!btn || !drawer) return;

  btn.setAttribute('aria-expanded', 'false');
  drawer.setAttribute('aria-hidden', 'true');

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    drawer.setAttribute('aria-hidden', String(expanded));
    document.body.style.overflow = expanded ? '' : 'hidden';
  });

  // Close drawer on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-hamburger]') && !e.target.closest('.kh-nav__drawer') && drawer.getAttribute('aria-hidden') === 'false') {
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  // Close drawer on nav link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // ESC key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') {
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      btn.focus();
    }
  });
}

/* ═══════════════════════════════════════════════════════
   2. ACCORDION
════════════════════════════════════════════════════════*/
function initAccordions() {
  document.querySelectorAll('.kh-accordion__item').forEach(item => {
    const trigger = item.querySelector('.kh-accordion__trigger');
    const panel = item.querySelector('.kh-accordion__panel');
    if (!trigger || !panel) return;

    const id = 'acc-panel-' + Math.random().toString(36).slice(2, 7);
    panel.id = id;
    trigger.setAttribute('aria-controls', id);
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      // Close all siblings first
      item.closest('.kh-accordion')?.querySelectorAll('.kh-accordion__item[data-open="true"]').forEach(sib => {
        if (sib !== item) {
          sib.removeAttribute('data-open');
          sib.querySelector('.kh-accordion__trigger')?.setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) {
        item.removeAttribute('data-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.setAttribute('data-open', 'true');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════
   3. SHA-256 CHECKSUM COPY BUTTON
════════════════════════════════════════════════════════*/
function initCopyButtons() {
  document.querySelectorAll('.kh-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const target = document.getElementById(btn.dataset.copyTarget || btn.dataset.target);
      const text = target ? target.textContent.trim() : btn.dataset.copy;
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard');
        btn.setAttribute('aria-label', 'Copied!');
        setTimeout(() => btn.setAttribute('aria-label', 'Copy to clipboard'), 2000);
      } catch {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Copied to clipboard');
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════
   4. TOAST NOTIFICATION
════════════════════════════════════════════════════════*/
function showToast(message) {
  let toast = document.querySelector('.kh-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'kh-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('kh-toast--visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('kh-toast--visible'), 2500);
}

/* ═══════════════════════════════════════════════════════
   5. ACTIVE NAV LINK HIGHLIGHTING
════════════════════════════════════════════════════════*/
function initActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.kh-nav__links a, .kh-nav__drawer a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    // Match exact page
    const linkPath = new URL(href, window.location.href).pathname;
    if (path === linkPath || (path.endsWith('/') && linkPath === path.slice(0, -1))) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ═══════════════════════════════════════════════════════
   6. SMOOTH SCROLL FOR HASH LINKS (64px nav offset)
════════════════════════════════════════════════════════*/
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════════════════
   7. LANGUAGE SWITCHER — SET PREFERENCE & NAVIGATE
════════════════════════════════════════════════════════*/
function initLangSwitch() {
  document.querySelectorAll('[data-lang-switch]').forEach(el => {
    el.addEventListener('click', (e) => {
      const lang = el.dataset.langSwitch;
      if (lang) {
        try { localStorage.setItem('khetala_lang', lang); } catch {}
      }
      // Allow default navigation to proceed
    });
  });
}

/* ═══════════════════════════════════════════════════════
   8. 3D DEVICE PERSPECTIVE & TOUCH INTERACTIVITY
════════════════════════════════════════════════════════*/
function init3DInteractive() {
  const devices = document.querySelectorAll('.kh-device-wrap');
  if (!devices.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  devices.forEach(wrap => {
    const phone = wrap.querySelector('.kh-device-phone');
    if (!phone) return;

    function handleMove(clientX, clientY) {
      const rect = wrap.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      if (x < -0.1 || x > 1.1 || y < -0.1 || y > 1.1) return;

      const tiltX = (0.5 - y) * 12;
      const tiltY = (x - 0.5) * 14;
      phone.style.transform = `perspective(1000px) rotateY(${tiltY.toFixed(1)}deg) rotateX(${tiltX.toFixed(1)}deg) translateY(-4px) scale(1.02)`;
    }

    wrap.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });

    wrap.addEventListener('mouseleave', () => {
      phone.style.transform = '';
    });

    wrap.addEventListener('touchstart', () => {
      phone.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-6px) scale(1.02)';
    }, { passive: true });

    wrap.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    wrap.addEventListener('touchend', () => {
      setTimeout(() => {
        phone.style.transform = '';
      }, 500);
    }, { passive: true });
  });
}

/* ═══════════════════════════════════════════════════════
   BOOT
════════════════════════════════════════════════════════*/
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAccordions();
  initCopyButtons();
  initActiveNav();
  initSmoothScroll();
  initLangSwitch();
  init3DInteractive();
});
