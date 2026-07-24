// js/nav.js — Sticky nav: glassmorphism on scroll, active section, mobile overlay

'use strict';

const nav       = document.getElementById('site-nav');
const hamburger = document.getElementById('nav-hamburger');
const mobileNav = document.getElementById('nav-mobile');
const mobileLinks = mobileNav?.querySelectorAll('.nav__mobile-link, .nav__mobile-cta');
const navLinks    = nav?.querySelectorAll('.nav__link');

// ── Scroll: glassmorphism + active link ────────────────────────
const SECTION_IDS = ['hero', 'about', 'skills', 'work', 'contact'];

function updateNav() {
  const y = window.scrollY;

  // Glass blur
  if (y > 24) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Active link
  const scrollMid = y + window.innerHeight * 0.38;
  let activeId = null;

  SECTION_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.offsetTop;
    if (scrollMid >= top) activeId = id;
  });

  navLinks?.forEach(link => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.setAttribute('aria-current', href === activeId ? 'true' : 'false');
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Mobile overlay ─────────────────────────────────────────────
function openMenu() {
  hamburger.setAttribute('aria-expanded', 'true');
  mobileNav.classList.add('open');
  // Focus first link for keyboard users
  mobileNav.querySelector('.nav__mobile-link')?.focus();
}

function closeMenu() {
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  hamburger.focus();
}

hamburger?.addEventListener('click', e => {
  e.stopPropagation();
  hamburger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
});

mobileLinks?.forEach(link => link.addEventListener('click', closeMenu));

// Close menu on click outside
document.addEventListener('click', e => {
  if (
    mobileNav &&
    mobileNav.classList.contains('open') &&
    !mobileNav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
    closeMenu();
  }
});
