/* =========================================================
   SHOINBASE | 山口県湯田温泉 — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mainNav.classList.toggle('open');
    });

    // Close menu when a nav link is clicked (mobile)
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
      const isClickInside = mainNav.contains(e.target) || hamburger.contains(e.target);
      if (!isClickInside && mainNav.classList.contains('open')) {
        hamburger.classList.remove('active');
        mainNav.classList.remove('open');
      }
    });
  }

  /* ---------- Fade-up on scroll ---------- */
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: reveal everything immediately
    fadeEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');

  const setActiveLink = () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-link');
      }
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('header');
  const toggleHeaderShadow = () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 20px rgba(43,36,31,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
  toggleHeaderShadow();

});
