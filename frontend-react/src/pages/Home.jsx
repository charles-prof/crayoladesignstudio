import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import content from '../data/site_content.json';
import { Link } from 'react-router-dom';
import CinematicExperience from '../components/CinematicExperience';
import PanoramaViewer from '../components/PanoramaViewer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef();
  
  useGSAP(() => {
    // Scroll reveals inside the cinematic track
    gsap.utils.toArray('.cine-reveal').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }),
        once: true
      });
      // Initial state
      gsap.set(el, { opacity: 0, y: 50 });
    });
  }, { scope: container });

  return (
    <CinematicExperience>
      <div ref={container} className="page-wrapper" style={{ background: 'transparent' }}>
        
        {/* Cinematic Section 1: Hero */}
        <section className="cinematic-section">
          <h1 className="cine-reveal">{content.home.hero.headline}</h1>
          <p className="cine-reveal" style={{ transitionDelay: '0.2s' }}>{content.home.hero.subheadline}</p>
        </section>

        {/* Cinematic Section 2: Philosophy */}
        <section className="cinematic-section" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
          <h1 className="cine-reveal">{content.home.intro.heading}</h1>
          <p className="cine-reveal" style={{ transitionDelay: '0.2s' }}>{content.home.intro.text}</p>
        </section>

        {/* Cinematic Section 3: Services */}
        <section className="cinematic-section" style={{ background: 'var(--fg)', color: 'var(--white)' }}>
          <div className="container" style={{ margin: 0, padding: 0 }}>
            <h1 className="cine-reveal" style={{ marginBottom: '4rem' }}>{content.home.servicesTeaser.heading}</h1>
            <div className="services-teaser-grid">
              <div className="service-teaser-item cine-reveal" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                <p className="service-num" style={{ color: '#F5A800' }}>01</p>
                <h3>{content.services.interiorDesign.heading}</h3>
                <p>{content.services.interiorDesign.oneLiner}</p>
              </div>
              <div className="service-teaser-item cine-reveal" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                <p className="service-num" style={{ color: '#F5A800' }}>02</p>
                <h3>{content.services.exteriorDesign.heading}</h3>
                <p>{content.services.exteriorDesign.oneLiner}</p>
              </div>
              <div className="service-teaser-item cine-reveal" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                <p className="service-num" style={{ color: '#F5A800' }}>03</p>
                <h3>{content.services.archViz.heading}</h3>
                <p>{content.services.archViz.oneLiner}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 360° Panorama Experience */}
        <PanoramaViewer />

        {/* Cinematic Section 4: CTA */}
        <section className="cinematic-section" style={{ alignItems: 'center', textAlign: 'center', background: 'var(--bg)', color: 'var(--fg)' }}>
          <h1 className="cine-reveal">{content.home.cta.heading}</h1>
          <Link to="/contact" className="btn-dark cine-reveal" style={{ marginTop: '2rem', transitionDelay: '0.2s' }}>
            {content.home.cta.buttonText}
          </Link>
        </section>

      </div>
    </CinematicExperience>
  );
}
