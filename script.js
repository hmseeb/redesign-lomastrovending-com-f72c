/* Lo Mastro Vending & Service — site interactions */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var nav = document.getElementById('primaryNav');
  var toggle = document.getElementById('navToggle');
  var toTop = document.getElementById('toTop');

  /* ── Mobile navigation ─────────────────────────────────────────────── */
  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  function openNav() {
    if (!nav || !toggle) return;
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ── Header shadow + back-to-top visibility ────────────────────────── */
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.classList.toggle('show', y > 620);
    sweepReveals();
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(onScroll);
  }, { passive: true });

  onScroll();

  /* ── Reveal on scroll ──────────────────────────────────────────────── */
  var revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var observer = null;

  function show(el, stagger) {
    if (el.classList.contains('in')) return;
    if (stagger) {
      var siblings = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [];
      var index = siblings.indexOf(el);
      el.style.transitionDelay = (Math.max(0, Math.min(index, 5)) * 80) + 'ms';
    }
    el.classList.add('in');
    if (observer) observer.unobserve(el);
  }

  /* Safety net: any element at or above the fold must never stay hidden.
     IntersectionObserver can miss elements skipped over by a fast flick or an
     anchor jump, which would leave whole sections blank. This sweep guarantees
     they resolve regardless of how the user got there. */
  function sweepReveals() {
    /* onScroll() runs once during init, before these vars are assigned. */
    if (!revealables || !revealables.length) return;
    var limit = window.innerHeight * 0.95;
    for (var i = 0; i < revealables.length; i++) {
      var el = revealables[i];
      if (el.classList.contains('in')) continue;
      if (el.getBoundingClientRect().top < limit) show(el, true);
    }
    revealables = revealables.filter(function (el) { return !el.classList.contains('in'); });
  }

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealables.forEach(function (el) { el.classList.add('in'); });
    revealables = [];
  } else {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) show(entry.target, true);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealables.forEach(function (el) { observer.observe(el); });
    sweepReveals();
  }

  /* Final guarantee: if anything is still hidden once everything has loaded,
     reveal it rather than risk invisible content. */
  window.addEventListener('load', function () {
    setTimeout(sweepReveals, 60);
  });

  /* ── Current year in footer copyright (kept static label intact) ───── */
  /* Smooth anchor offset fallback for browsers without scroll-padding    */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - (header ? header.offsetHeight + 12 : 0);
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });
})();
