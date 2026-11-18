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
          <div className="cta-actions-group cine-reveal" style={{ transitionDelay: '0.25s' }}>
            <Link to="/contact" className="btn-dark cta-btn">
              {content.home.cta.buttonText}
            </Link>
            <a 
              href={`https://wa.me/${content.contact?.whatsappNumber || '919698753213'}?text=${encodeURIComponent('Hello Crayola Design Studio, I would like to discuss our upcoming architectural project.')}`}
              target="_blank" 
              rel="noreferrer" 
              className="btn-whatsapp-outline"
            >
              <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
                <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.666.776 5.15 2.115 7.24L3 29.5l6.45-1.583A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.717c-2.31 0-4.475-.688-6.287-1.874l-.45-.296-3.83.94 1.03-3.69-.297-.473A11.168 11.168 0 0 1 4.783 16C4.783 9.815 9.815 4.783 16 4.783S27.217 9.815 27.217 16 22.185 27.217 16 27.217zm7.42-8.995c-.407-.203-2.408-1.188-2.78-1.324-.373-.135-.644-.203-.915.204-.271.407-1.05 1.323-1.288 1.595-.237.271-.475.305-.882.102-.407-.204-1.718-.633-3.272-2.02-1.21-1.078-2.026-2.41-2.264-2.817-.237-.407-.025-.627.178-.83.183-.183.407-.475.61-.712.204-.237.272-.407.408-.678.135-.271.068-.509-.034-.712-.102-.204-.916-2.205-1.255-3.02-.33-.794-.666-.686-.915-.698l-.78-.014c-.271 0-.712.102-1.085.509-.373.407-1.424 1.39-1.424 3.391s1.458 3.934 1.662 4.205c.203.271 2.87 4.382 6.953 6.146.971.42 1.73.67 2.321.859.976.31 1.864.266 2.566.162.783-.117 2.408-.984 2.747-1.933.34-.95.34-1.764.238-1.933-.102-.17-.373-.271-.78-.475z"/>
              </svg>
              <span>Instant WhatsApp Chat →</span>
            </a>
          </div>
        </section>

      </div>
    </CinematicExperience>
  );
}
