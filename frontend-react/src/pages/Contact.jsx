import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import content from '../data/site_content.json';

export default function Contact() {
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
        <p className="page-hero-eyebrow reveal">Let's Talk</p>
        <h1 className="reveal reveal-delay-1">Start your<br/>project today.</h1>
      </section>

      <section className="section container">
        <div className="contact-grid">
          <div>
            <h2 className="reveal">{content.contact.intro.text}</h2>
            
            <div className="contact-detail reveal reveal-delay-1" style={{ marginTop: '3rem' }}>
              <p className="contact-detail-label">Operating Cities</p>
              <p className="contact-detail-value">Bangalore · Trichy · Hyderabad · Coimbatore</p>
            </div>
            
            <div className="contact-detail reveal reveal-delay-2">
              <p className="contact-detail-label">Instagram</p>
              <p className="contact-detail-value">
                <a href="https://www.instagram.com/crayola_design_studio/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  @crayola_design_studio ↗
                </a>
              </p>
            </div>
            
            <div className="contact-detail reveal reveal-delay-3">
              <p className="contact-detail-label">Response Time</p>
              <p className="contact-detail-value">We typically respond within 24 hours.</p>
            </div>
          </div>

          <form className="contact-form reveal reveal-delay-1" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="John" required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Doe" required />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label>Phone (Optional)</label>
              <input type="tel" placeholder="+91 98765 43210" />
            </div>
            <div className="form-group">
              <label>Service Required</label>
              <select defaultValue="">
                <option value="" disabled>Select a service...</option>
                <option>Interior Design</option>
                <option>Exterior Design</option>
                <option>Architectural Visualization (ArchViz)</option>
                <option>Full Project (All Services)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tell us about your project</label>
              <textarea rows="5" placeholder="What are you envisioning? Location, size, timeline..." required></textarea>
            </div>
            <button type="submit" className="btn-dark">Send Message →</button>
          </form>
        </div>
      </section>
    </div>
  );
}
