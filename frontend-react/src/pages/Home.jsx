import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import content from '../../site_content.json';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef();
  
  useGSAP(() => {
    // Hero Entrance
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('.hero-bg', { scale: 1, duration: 2.2, ease: 'power3.out' })
      .to('.hero-eyebrow',  { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=1.6')
      .to('.hero-title',    { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=1.0')
      .to('.hero-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
      .to('.hero-scroll-cue', { opacity: 1, duration: 0.8 }, '-=0.3');

    // Hero Parallax
    gsap.to('.hero-bg', {
      y: '25%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-3d',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Reveal Elements
    gsap.utils.toArray('.reveal').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('visible'),
        once: true
      });
    });

    // Fluid Gallery Horizontal Scroll
    const track = document.querySelector('.fluid-gallery-track');
    const section = document.querySelector('.fluid-gallery');
    if (track && section) {
      const walk = track.scrollWidth - window.innerWidth;
      if (walk > 0) {
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
      }
    }
  }, { scope: container });

  return (
    <div ref={container} className="page-wrapper">
      {/* 01: Hero */}
      <section className="hero-3d">
        <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2400')" }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-eyebrow" style={{ transform: 'translateY(30px)', opacity: 0 }}>Bangalore · Trichy · Hyderabad · Coimbatore</p>
          <h1 className="hero-title" style={{ transform: 'translateY(30px)', opacity: 0 }}>{content.home.hero.headline}</h1>
          <p className="hero-subtitle" style={{ transform: 'translateY(30px)', opacity: 0 }}>Interior &nbsp;·&nbsp; Exterior &nbsp;·&nbsp; ArchViz</p>
        </div>
        <div className="hero-scroll-cue" style={{ opacity: 0 }}>
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          <span>Interior Design</span><span>·</span>
          <span>Exterior Design</span><span>·</span>
          <span>Architectural Visualization</span><span>·</span>
          <span>Bangalore</span><span>·</span>
          <span>Trichy</span><span>·</span>
          <span>Hyderabad</span><span>·</span>
          <span>Coimbatore</span><span>·</span>
          {/* Duplicate for seamless loop */}
          <span>Interior Design</span><span>·</span>
          <span>Exterior Design</span><span>·</span>
          <span>Architectural Visualization</span><span>·</span>
          <span>Bangalore</span><span>·</span>
          <span>Trichy</span><span>·</span>
          <span>Hyderabad</span><span>·</span>
          <span>Coimbatore</span><span>·</span>
        </div>
      </div>

      {/* 02: Intro Statement */}
      <section className="intro-statement">
        <div className="intro-number reveal">07</div>
        <p className="intro-text reveal reveal-delay-1">
          {content.home.intro.text}
        </p>
      </section>

      {/* 03: Services Teaser */}
      <section className="services-teaser">
        <div className="container">
          <div className="services-teaser-grid">
            <div className="service-teaser-item reveal">
              <p className="service-num">01</p>
              <h3>{content.services.interiorDesign.heading}</h3>
              <p>{content.services.interiorDesign.oneLiner}</p>
            </div>
            <div className="service-teaser-item reveal reveal-delay-1">
              <p className="service-num">02</p>
              <h3>{content.services.exteriorDesign.heading}</h3>
              <p>{content.services.exteriorDesign.oneLiner}</p>
            </div>
            <div className="service-teaser-item reveal reveal-delay-2">
              <p className="service-num">03</p>
              <h3>{content.services.archViz.heading}</h3>
              <p>{content.services.archViz.oneLiner}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04: Fluid Gallery */}
      <section className="fluid-gallery">
        <div className="gallery-header-row reveal">
          <h2>Selected Works</h2>
          <Link to="/portfolio">View All Projects →</Link>
        </div>
        <div className="fluid-gallery-track">
          {/* Hardcoded for now until images are sorted */}
          <div className="gallery-item">
            <Link to="/project/serenity-villa">
              <div className="image-wrapper">
                <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1400" alt="Serenity Villa" />
              </div>
              <p className="gallery-item-label">Serenity Villa</p>
              <p className="gallery-item-category">Interior Design · Bangalore</p>
            </Link>
          </div>
          <div className="gallery-item">
            <Link to="/project/the-glass-house">
              <div className="image-wrapper">
                <img src="https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=1400" alt="The Glass House" />
              </div>
              <p className="gallery-item-label">The Glass House</p>
              <p className="gallery-item-category">ArchViz · Hyderabad</p>
            </Link>
          </div>
          <div className="gallery-item">
            <Link to="/project/oakwood-residence">
              <div className="image-wrapper">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400" alt="Oakwood Residence" />
              </div>
              <p className="gallery-item-label">Oakwood Residence</p>
              <p className="gallery-item-category">Exterior Design · Coimbatore</p>
            </Link>
          </div>
          <div className="gallery-item">
            <Link to="/project/loft-22">
              <div className="image-wrapper">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1400" alt="Loft 22" />
              </div>
              <p className="gallery-item-label">Loft 22</p>
              <p className="gallery-item-category">Interior Design · Trichy</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 05: CTA Strip */}
      <section className="cta-strip">
        <h2 className="reveal">{content.home.cta.heading}</h2>
        <Link to="/contact" className="btn-outline-white reveal reveal-delay-1">{content.home.cta.buttonText}</Link>
      </section>
    </div>
  );
}
