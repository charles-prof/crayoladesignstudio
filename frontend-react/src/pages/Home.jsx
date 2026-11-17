import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import content from '../data/site_content.json';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';
import CinematicExperience from '../components/CinematicExperience';
import PanoramaViewer from '../components/PanoramaViewer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef();
  const featuredProjects = projects.slice(0, 3);
  
  useGSAP(() => {
    gsap.utils.toArray('.cine-reveal').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }),
        once: true
      });
      gsap.set(el, { opacity: 0, y: 40 });
    });
  }, { scope: container });

  return (
    <CinematicExperience>
      <div ref={container} className="page-wrapper" style={{ background: 'transparent' }}>
        
        {/* Section 1: Monumental Hero */}
        <section className="cinematic-section hero-section">
          <div className="hero-eyebrow cine-reveal">
            <span className="studio-pill">CRAYOLA DESIGN STUDIO</span>
            <span className="cities-badge">BANGALORE · TRICHY · HYDERABAD · COIMBATORE</span>
          </div>

          <h1 className="cine-reveal hero-headline">
            {content.home.hero.headline}
          </h1>

          <p className="cine-reveal hero-subline" style={{ transitionDelay: '0.15s' }}>
            {content.home.hero.subheadline}
          </p>

          <div className="hero-actions cine-reveal" style={{ transitionDelay: '0.25s' }}>
            <Link to="/portfolio" className="btn-hero-primary">
              EXPLORE WORKS
            </Link>
            <Link to="/contact" className="btn-hero-secondary">
              START A PROJECT
            </Link>
          </div>
        </section>

        {/* Section 2: Architectural Philosophy */}
        <section className="cinematic-section philosophy-section">
          <div className="section-eyebrow cine-reveal">OUR APPROACH</div>
          <h2 className="cine-reveal philosophy-heading">{content.home.intro.heading}</h2>
          <p className="cine-reveal philosophy-text" style={{ transitionDelay: '0.15s' }}>
            {content.home.intro.text}
          </p>
          <div className="philosophy-meta cine-reveal" style={{ transitionDelay: '0.25s' }}>
            <div className="meta-block">
              <span className="meta-num">4</span>
              <span className="meta-label">South Indian Hubs</span>
            </div>
            <div className="meta-block">
              <span className="meta-num">100%</span>
              <span className="meta-label">Photorealistic Accuracy</span>
            </div>
            <div className="meta-block">
              <span className="meta-num">03</span>
              <span className="meta-label">Design Disciplines</span>
            </div>
          </div>
        </section>

        {/* Section 3: Services Pillars */}
        <section className="cinematic-section services-section">
          <div className="container" style={{ margin: 0, padding: 0 }}>
            <div className="services-header cine-reveal">
              <span className="section-eyebrow">CORE DISCIPLINES</span>
              <h2 className="section-title">{content.home.servicesTeaser.heading}</h2>
            </div>

            <div className="services-teaser-grid">
              <div className="service-teaser-item cine-reveal">
                <p className="service-num">01</p>
                <h3>{content.services.interiorDesign.heading}</h3>
                <p>{content.services.interiorDesign.oneLiner}</p>
                <Link to="/services" className="service-link">View Scope →</Link>
              </div>

              <div className="service-teaser-item cine-reveal">
                <p className="service-num">02</p>
                <h3>{content.services.exteriorDesign.heading}</h3>
                <p>{content.services.exteriorDesign.oneLiner}</p>
                <Link to="/services" className="service-link">View Scope →</Link>
              </div>

              <div className="service-teaser-item cine-reveal">
                <p className="service-num">03</p>
                <h3>{content.services.archViz.heading}</h3>
                <p>{content.services.archViz.oneLiner}</p>
                <Link to="/services" className="service-link">View Scope →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Featured Authentic Projects */}
        <section className="cinematic-section featured-projects-section">
          <div className="container" style={{ margin: 0, padding: 0, width: '100%' }}>
            <div className="featured-header cine-reveal">
              <div>
                <span className="section-eyebrow">SELECTED WORKS</span>
                <h2 className="section-title">ORIGINAL ARCHITECTURE</h2>
              </div>
              <Link to="/portfolio" className="btn-view-all">VIEW ALL PROJECTS →</Link>
            </div>

            <div className="featured-grid">
              {featuredProjects.map((p) => (
                <Link key={p.id} to={`/project/${p.id}`} className="featured-card cine-reveal">
                  <div className="featured-image-wrap">
                    <img 
                      src={p.thumbnail} 
                      alt={p.title} 
                      loading="lazy" 
                      style={{ objectPosition: p.cardPosition || p.heroPosition || 'center 50%' }}
                    />
                    <span className="featured-category">
                      {p.category === '3d-viz' ? '3D Visualization' : p.category}
                    </span>
                    {p.badge && (
                      <span style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'rgba(14, 14, 14, 0.88)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(245, 168, 0, 0.45)',
                        color: '#F5A800',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '3px',
                        zIndex: 2,
                      }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="featured-info">
                    <div className="featured-meta-row">
                      <span className="featured-loc">{p.location}</span>
                      <span className="featured-year">{p.year}</span>
                    </div>
                    <h3>{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Interactive 360° Panorama Experience */}
        <PanoramaViewer />

        {/* Section 6: Monumental Call to Action */}
        <section className="cinematic-section cta-section">
          <span className="section-eyebrow cine-reveal">START A CONVERSATION</span>
          <h2 className="cine-reveal cta-headline">{content.home.cta.heading}</h2>
          <p className="cine-reveal cta-subtext" style={{ transitionDelay: '0.15s' }}>
            Available for architectural, interior, and 3D visualization commissions across Bangalore, Trichy, Hyderabad, and Coimbatore.
          </p>
          <Link to="/contact" className="btn-dark cine-reveal cta-btn" style={{ transitionDelay: '0.25s' }}>
            {content.home.cta.buttonText}
          </Link>
        </section>

      </div>
    </CinematicExperience>
  );
}
