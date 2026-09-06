import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import content from '../data/site_content.json';

export default function Services() {
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
        <p className="page-hero-eyebrow reveal">What We Do</p>
        <h1 className="reveal reveal-delay-1">Design from<br/>concept to<br/>completion.</h1>
      </section>

      <section className="section container">
        <div className="service-row">
          <img src="/projects/img-035.jpg" alt="Interior Design" />
          <div className="service-content">
            <p className="service-content-num reveal">01 — {content.services.interiorDesign.heading}</p>
            <h2 className="reveal reveal-delay-1">{content.services.interiorDesign.oneLiner}</h2>
            <p className="reveal reveal-delay-2">{content.services.interiorDesign.description}</p>
          </div>
        </div>
      </section>

      <section className="section-sm container">
        <div className="service-row">
          <img src="/projects/img-002.jpg" alt="Exterior Design" />
          <div className="service-content">
            <p className="service-content-num reveal">02 — {content.services.exteriorDesign.heading}</p>
            <h2 className="reveal reveal-delay-1">{content.services.exteriorDesign.oneLiner}</h2>
            <p className="reveal reveal-delay-2">{content.services.exteriorDesign.description}</p>
          </div>
        </div>
      </section>

      <section className="section-sm container">
        <div className="service-row">
          <img src="/projects/img-016.png" alt="ArchViz" />
          <div className="service-content">
            <p className="service-content-num reveal">03 — {content.services.archViz.heading}</p>
            <h2 className="reveal reveal-delay-1">{content.services.archViz.oneLiner}</h2>
            <p className="reveal reveal-delay-2">{content.services.archViz.description}</p>
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <h2 className="reveal">Ready to transform your space?</h2>
        <Link to="/contact" className="btn-outline-white reveal reveal-delay-1">Start a Project</Link>
      </section>
    </div>
  );
}
