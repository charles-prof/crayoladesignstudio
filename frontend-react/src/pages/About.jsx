import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import content from '../data/site_content.json';

export default function About() {
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo('.reveal', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
    );
  }, { scope: container });

  return (
    <div ref={container} className="page-wrapper">
      <section className="page-hero">
        <p className="page-hero-eyebrow reveal">About the Studio</p>
        <h1 className="reveal reveal-delay-1">Architecture<br/>that feels like<br/><em>home.</em></h1>
      </section>

      <section>
        <img
          src="/projects/real/grand-villa-elevation-front.jpg"
          alt="Crayola Design Studio architectural exterior"
          style={{ width: '100%', height: '65vh', objectFit: 'cover' }}
        />
      </section>

      <section className="section container">
        <div className="about-split">
          <div>
            <p className="about-intro-label reveal">{content.about.whoWeAre.heading}</p>
            <p className="about-intro-text reveal reveal-delay-1">{content.about.whoWeAre.text}</p>
            <p className="about-body reveal reveal-delay-2">{content.about.philosophy.text}</p>

            <div className="about-stats" style={{ marginTop: '4rem' }}>
              <div className="stat-item reveal">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item reveal reveal-delay-1">
                <h3>04</h3>
                <p>Cities Across South India</p>
              </div>
              <div className="stat-item reveal reveal-delay-2">
                <h3>3</h3>
                <p>Core Services</p>
              </div>
              <div className="stat-item reveal reveal-delay-3">
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </div>

          <div>
            <p className="about-intro-label reveal" style={{ marginBottom: '2rem' }}>Our Process</p>
            <ul className="process-list">
              {content.about.process.map((p, i) => (
                <li key={i}>
                  <span className="process-num"></span>
                  <div className="process-content reveal">
                    <h4>{p.title}</h4>
                    <p>{p.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <h2 className="reveal">Let's build something meaningful together.</h2>
        <Link to="/contact" className="btn-outline-white reveal reveal-delay-1">Get in Touch</Link>
      </section>
    </div>
  );
}
