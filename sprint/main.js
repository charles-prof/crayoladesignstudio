import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Alpine from 'alpinejs';
import barba from '@barba/core';

gsap.registerPlugin(ScrollTrigger);
window.Alpine = Alpine;
Alpine.start();

/* =============================================
   SCROLL PROGRESS BAR
   ============================================= */
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
});

/* =============================================
   SECTION PILL INDICATOR
   ============================================= */
const setupPillNav = () => {
  const pill = document.getElementById('section-pill');
  if (!pill) return;

  const sections = document.querySelectorAll('[data-section]');
  if (!sections.length) { pill.style.display = 'none'; return; }

  pill.innerHTML = '';
  sections.forEach((sec, i) => {
    const dot = document.createElement('button');
    dot.className = 'pill-dot';
    dot.title = sec.dataset.section;
    dot.addEventListener('click', () => {
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    pill.appendChild(dot);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(sections).indexOf(entry.target);
        pill.querySelectorAll('.pill-dot').forEach((d, i) => {
          d.classList.toggle('active', i === idx);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
};

/* =============================================
   REVEAL ANIMATIONS (Intersection Observer)
   ============================================= */
const setupReveal = (container = document) => {
  const els = container.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => obs.observe(el));
};

/* =============================================
   HERO (Home) — Cinematic Parallax
   ============================================= */
const initHero = (container = document) => {
  const heroBg = container.querySelector('.hero-bg');
  const eyebrow = container.querySelector('.hero-eyebrow');
  const title = container.querySelector('.hero-title');
  const subtitle = container.querySelector('.hero-subtitle');
  const scrollCue = container.querySelector('.hero-scroll-cue');

  if (!heroBg || !title) return;

  // Entrance timeline
  const tl = gsap.timeline({ delay: 0.2 });
  tl.to(heroBg, { scale: 1, duration: 2.2, ease: 'power3.out' })
    .to(eyebrow,  { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=1.6')
    .to(title,    { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=1.0')
    .to(subtitle, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
    .to(scrollCue, { opacity: 1, duration: 0.8 }, '-=0.3');

  gsap.set([eyebrow, title, subtitle], { y: 30 });

  // Scroll parallax — bg moves up slower than scroll speed
  gsap.to(heroBg, {
    y: '25%',
    ease: 'none',
    scrollTrigger: {
      trigger: container.querySelector('.hero-3d') || document.querySelector('.hero-3d'),
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });
};

/* =============================================
   FLUID GALLERY — Horizontal Scroll
   ============================================= */
const initGallery = (container = document) => {
  const track = container.querySelector('.fluid-gallery-track');
  const section = container.querySelector('.fluid-gallery');
  if (!track || !section) return;

  const walk = track.scrollWidth - window.innerWidth;
  if (walk <= 0) return;

  gsap.to(track, {
    x: () => -(walk - 80),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => `+=${walk}`,
      invalidateOnRefresh: true,
    }
  });
};

/* =============================================
   BARBA.JS PAGE TRANSITIONS
   ============================================= */
const initPage = (container = document) => {
  setupReveal(container);
  initHero(container);
  initGallery(container);
  setupPillNav();
};

barba.init({
  preventRunning: true,
  transitions: [{
    name: 'crisp-fade',
    sync: false,
    async leave({ current }) {
      await gsap.to(current.container, {
        opacity: 0, duration: 0.28, ease: 'power2.in'
      });
    },
    async enter({ next }) {
      window.scrollTo(0, 0);
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.set(next.container, { opacity: 0 });
      await gsap.to(next.container, {
        opacity: 1, duration: 0.4, ease: 'power2.out'
      });
      initPage(next.container);
    }
  }]
});

// First load
document.addEventListener('DOMContentLoaded', () => initPage(document));
