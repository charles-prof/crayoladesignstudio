import barba from '@barba/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Function to animate the hero block
const initHeroAnimations = (container) => {
  const hero = container.querySelector('.crayola-hero-3d');
  if (!hero) return;

  const title = hero.querySelector('.hero-title');
  const subtitle = hero.querySelector('.hero-subtitle');
  const canvas = hero.querySelector('.hero-canvas-container');

  const tl = gsap.timeline();
  
  // Animate background image scale
  tl.to(canvas, {
    scale: 1,
    duration: 2,
    ease: "power3.out"
  }, 0);

  // Stagger text in
  tl.to([title, subtitle], {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out"
  }, 0.5);
};

// Function to animate fluid galleries
const initFluidGalleries = (container) => {
  const galleries = container.querySelectorAll('.crayola-fluid-gallery');
  
  galleries.forEach(gallery => {
    const track = gallery.querySelector('.fluid-gallery-track');
    if (!track) return;

    // Calculate how far to scroll the track
    const walk = track.scrollWidth - window.innerWidth;
    
    if (walk > 0) {
      gsap.to(track, {
        x: -walk,
        ease: "none",
        scrollTrigger: {
          trigger: gallery,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => `+=${walk}`
        }
      });
    }

    // Add parallax to images inside the track
    const images = gallery.querySelectorAll('.fluid-gallery-image-wrapper img');
    images.forEach(img => {
      gsap.to(img, {
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: gallery,
          scrub: 1,
          start: "top bottom",
          end: "bottom top"
        }
      });
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize initial page blocks
  initHeroAnimations(document);
  initFluidGalleries(document);

  // Initialize Barba.js
  barba.init({
    transitions: [{
      name: 'opacity-transition',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5
        });
      },
      enter(data) {
        // Kill old ScrollTriggers to prevent memory leaks and jumping
        ScrollTrigger.getAll().forEach(t => t.kill());

        // Re-init blocks on new page load
        initHeroAnimations(data.next.container);
        initFluidGalleries(data.next.container);
        
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5
        });
      }
    }]
  });
  
  console.log('Frontend initialized with Barba, GSAP, and ScrollTrigger');
});
