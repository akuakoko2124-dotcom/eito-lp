/* ============================================================
  EITO - JavaScript
  ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // 1. Header — scroll detection
  // ============================================================
  const header = document.getElementById('header');

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial call

  // ============================================================
  // 2. Hamburger menu toggle
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // ============================================================
  // 3. Smooth scroll for all anchor links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')) || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ============================================================
  // 4. Scroll-triggered animations (IntersectionObserver)
  // ============================================================
  const animEls = document.querySelectorAll('[data-anim]');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;
        if (delay > 0) {
          setTimeout(() => el.classList.add('visible'), delay * 1000);
        } else {
          el.classList.add('visible');
        }
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animEls.forEach((el) => observer.observe(el));

  // ============================================================
  // 5. Active nav link on scroll
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY;
    const offset = 120;

    sections.forEach((section) => {
      const top = section.offsetTop - offset;
      const bottom = top + section.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        const id = section.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ============================================================
  // 6. Hero title letter split animation
  // ============================================================
  function initHeroAnimation() {
    const heroEyebrow = document.querySelector('.hero-eyebrow');
    const heroTitle = document.querySelector('.hero-title-main');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroCta = document.querySelector('.hero-cta');

    // Eyebrow
    if (heroEyebrow) {
      heroEyebrow.style.opacity = '0';
      heroEyebrow.style.transform = 'translateY(10px)';
      setTimeout(() => {
        heroEyebrow.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroEyebrow.style.opacity = '0.8';
        heroEyebrow.style.transform = 'translateY(0)';
      }, 200);
    }

    // Title
    if (heroTitle) {
      heroTitle.style.opacity = '0';
      heroTitle.style.transform = 'translateY(20px)';
      setTimeout(() => {
        heroTitle.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
      }, 400);
    }

    // Tagline
    if (heroTagline) {
      heroTagline.style.opacity = '0';
      heroTagline.style.transform = 'translateY(16px)';
      setTimeout(() => {
        heroTagline.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroTagline.style.opacity = '1';
        heroTagline.style.transform = 'translateY(0)';
      }, 700);
    }

    // CTA
    if (heroCta) {
      heroCta.style.opacity = '0';
      heroCta.style.transform = 'translateY(16px)';
      setTimeout(() => {
        heroCta.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroCta.style.opacity = '1';
        heroCta.style.transform = 'translateY(0)';
      }, 950);
    }
  }

  // Run on DOMContentLoaded (already loaded since script is at end of body)
  initHeroAnimation();

  // ============================================================
  // 7. Parallax on hero decorations (subtle)
  // ============================================================
  const heroDeco1 = document.querySelector('.hero-deco--1');
  const heroDeco2 = document.querySelector('.hero-deco--2');

  function onParallax() {
    const scrollY = window.scrollY;
    if (heroDeco1) heroDeco1.style.transform = `translateY(${scrollY * 0.1}px)`;
    if (heroDeco2) heroDeco2.style.transform = `translateY(${-scrollY * 0.08}px)`;
  }

  window.addEventListener('scroll', onParallax, { passive: true });

  // ============================================================
  // 8. Cursor glow effect (subtle)
  // ============================================================
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232, 213, 163, 0.04) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: left 0.5s ease, top 0.5s ease;
    z-index: 0;
    will-change: left, top;
  `;
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

})();
