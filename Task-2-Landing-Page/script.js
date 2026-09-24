/**
 * NEXORA Landing Page — JavaScript
 * ==================================
 * Handles:
 *  1. Mobile navigation (hamburger menu)
 *  2. FAQ accordion
 *  3. Scroll reveal animations
 *  4. Active navigation state
 *  5. Header scroll behavior
 */

(function () {
  'use strict';

  /* ─── DOM References ─── */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu__link') : [];
  const mobileMenuCta = mobileMenu ? mobileMenu.querySelector('.mobile-menu__cta') : null;
  const header = document.getElementById('header');
  const faqItems = document.querySelectorAll('.faq__item');
  const revealElements = document.querySelectorAll('[data-reveal]');
  const navLinks = document.querySelectorAll('.header__nav-link');
  const sections = document.querySelectorAll('section[id]');

  /* ─── 1. Mobile Navigation ─── */
  function openMobileMenu() {
    if (!hamburgerBtn || !mobileMenu) return;
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!hamburgerBtn || !mobileMenu) return;
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    const isOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when a link is clicked
  mobileMenuLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  if (mobileMenuCta) {
    mobileMenuCta.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
      hamburgerBtn.focus();
    }
  });

  // Close mobile menu when resizing to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024 && mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  /* ─── 2. FAQ Accordion ─── */
  faqItems.forEach(function (item) {
    var button = item.querySelector('.faq__question');
    if (!button) return;

    button.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Close all other FAQ items
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          var otherBtn = otherItem.querySelector('.faq__question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ─── 3. Scroll Reveal ─── */
  function checkReveal() {
    var windowHeight = window.innerHeight;
    var triggerPoint = windowHeight * 0.88;

    revealElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        el.classList.add('is-visible');
      }
    });
  }

  // Throttle scroll events for performance
  var revealTicking = false;
  function onScrollReveal() {
    if (!revealTicking) {
      requestAnimationFrame(function () {
        checkReveal();
        revealTicking = false;
      });
      revealTicking = true;
    }
  }

  window.addEventListener('scroll', onScrollReveal, { passive: true });
  // Initial check on page load
  checkReveal();

  /* ─── 4. Active Navigation State ─── */
  function updateActiveNav() {
    var scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  var navTicking = false;
  function onScrollNav() {
    if (!navTicking) {
      requestAnimationFrame(function () {
        updateActiveNav();
        navTicking = false;
      });
      navTicking = true;
    }
  }

  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ─── 5. Header Scroll Behavior ─── */
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.style.background = 'rgba(5, 8, 22, 0.95)';
    } else {
      header.style.background = 'rgba(5, 8, 22, 0.8)';
    }
  }

  var headerTicking = false;
  function onScrollHeader() {
    if (!headerTicking) {
      requestAnimationFrame(function () {
        updateHeader();
        headerTicking = false;
      });
      headerTicking = true;
    }
  }

  window.addEventListener('scroll', onScrollHeader, { passive: true });

})();
