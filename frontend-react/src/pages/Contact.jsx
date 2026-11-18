import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import content from '../data/site_content.json';

export default function Contact() {
  const container = useRef();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: 'Bangalore',
    service: 'Luxury Villa Architecture',
    area: '3,000 – 6,000 sq.ft',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  const studioPhone = content.contact.phone || '+91 96987 53213';
  const whatsappNum = content.contact.whatsappNumber || '919698753213';
  const studioEmail = content.contact.email || 'crayoladesignstudio@gmail.com';

  useGSAP(() => {
    gsap.fromTo('.reveal', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
    );
  }, { scope: container });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim() || 'Prospective Client';
    const lines = [
      `*New Project Consultation | Crayola Design Studio*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `• *Client Name:* ${fullName}`,
      `• *Phone / WhatsApp:* ${formData.phone || 'Not provided'}`,
      `• *Email:* ${formData.email || 'Not provided'}`,
      `• *Project City:* ${formData.city}`,
      `• *Service Required:* ${formData.service}`,
      `• *Estimated Scale / Area:* ${formData.area}`,
    ];

    if (formData.message.trim()) {
      lines.push(`• *Project Vision / Details:* ${formData.message.trim()}`);
    }

    lines.push(``);
    lines.push(`Hello Crayola team, I submitted this inquiry via your website and would like to consult with your lead architect regarding our project.`);

    return lines.join('\n');
  };

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault();
    const msg = generateWhatsAppMessage();
    const url = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`;
    setLastWhatsAppUrl(url);
    setSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = () => {
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim() || 'Prospective Client';
    const subject = `Project Inquiry: ${formData.service} in ${formData.city} - ${fullName}`;
    const body = generateWhatsAppMessage().replace(/\*/g, '');
    const mailtoUrl = `mailto:${studioEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div ref={container} className="page-wrapper">
      {/* Page Hero */}
      <section className="page-hero">
        <p className="page-hero-eyebrow reveal">DIRECT STUDIO CONCIERGE</p>
        <h1 className="reveal reveal-delay-1">Start your<br/>project today.</h1>
        <p className="contact-hero-subline reveal reveal-delay-2">
          Direct line to our principal design and photorealistic 3D visualization practice across Bangalore, Trichy, Hyderabad, and Coimbatore.
        </p>
      </section>

      {/* Main Conversion Space */}
      <section className="section container">
        <div className="contact-grid">
          
          {/* Left Column: Direct Studio Access Cards */}
          <div className="contact-sidebar">
            
            {/* Primary Action Card: WhatsApp Priority Desk */}
            <div className="contact-priority-card reveal">
              <div className="priority-badge">
                <span className="live-pulse-dot" />
                <span>FASTEST RESPONSE · TYPICALLY &lt; 15 MINS</span>
              </div>
              <h3 className="priority-title">Direct WhatsApp Consultation</h3>
              <p className="priority-desc">
                Share your floor plans, CAD drawings, elevation ideas, or site location directly with our principal design team for rapid spatial feedback and estimates.
              </p>

              <a 
                href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello Crayola Design Studio, I would like to consult with your lead architect about our upcoming project.')}`}
                target="_blank" 
                rel="noreferrer"
                className="btn-whatsapp-priority"
              >
                <svg className="btn-wa-icon" viewBox="0 0 32 32" width="22" height="22" fill="currentColor">
                  <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.666.776 5.15 2.115 7.24L3 29.5l6.45-1.583A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.717c-2.31 0-4.475-.688-6.287-1.874l-.45-.296-3.83.94 1.03-3.69-.297-.473A11.168 11.168 0 0 1 4.783 16C4.783 9.815 9.815 4.783 16 4.783S27.217 9.815 27.217 16 22.185 27.217 16 27.217zm7.42-8.995c-.407-.203-2.408-1.188-2.78-1.324-.373-.135-.644-.203-.915.204-.271.407-1.05 1.323-1.288 1.595-.237.271-.475.305-.882.102-.407-.204-1.718-.633-3.272-2.02-1.21-1.078-2.026-2.41-2.264-2.817-.237-.407-.025-.627.178-.83.183-.183.407-.475.61-.712.204-.237.272-.407.408-.678.135-.271.068-.509-.034-.712-.102-.204-.916-2.205-1.255-3.02-.33-.794-.666-.686-.915-.698l-.78-.014c-.271 0-.712.102-1.085.509-.373.407-1.424 1.39-1.424 3.391s1.458 3.934 1.662 4.205c.203.271 2.87 4.382 6.953 6.146.971.42 1.73.67 2.321.859.976.31 1.864.266 2.566.162.783-.117 2.408-.984 2.747-1.933.34-.95.34-1.764.238-1.933-.102-.17-.373-.271-.78-.475z"/>
                </svg>
                <span>Chat on WhatsApp ({studioPhone})</span>
                <span className="btn-arrow">→</span>
              </a>

              <div className="priority-footer-note">
                <span>Direct Studio Call:</span>
                <a href={`tel:${content.contact.phoneRaw || '+919698753213'}`} className="priority-call-link">
                  {studioPhone}
                </a>
              </div>
            </div>

            {/* Direct Studio Credentials */}
            <div className="contact-details-panel reveal reveal-delay-1">
              <div className="contact-detail">
                <p className="contact-detail-label">OFFICIAL EMAIL</p>
                <p className="contact-detail-value">
                  <a href={`mailto:${studioEmail}`} className="contact-text-link">
                    {studioEmail} ↗
                  </a>
                </p>
              </div>

              <div className="contact-detail">
                <p className="contact-detail-label">OPERATING HUBS</p>
                <p className="contact-detail-value">
                  {content.contact.cities || 'Bangalore · Trichy · Hyderabad · Coimbatore'}
                </p>
                <p className="contact-detail-subtext">
                  In-person site consultations and architectural supervision across South India.
                </p>
              </div>

              <div className="contact-detail">
                <p className="contact-detail-label">STUDIO HOURS</p>
                <p className="contact-detail-value">
                  {content.contact.hours || 'Mon – Sat: 9:00 AM – 8:00 PM IST'}
                </p>
              </div>

              <div className="contact-detail">
                <p className="contact-detail-label">INSTAGRAM PORTFOLIO</p>
                <p className="contact-detail-value">
                  <a 
                    href={content.contact.instagramUrl || "https://www.instagram.com/crayola_design_studio/"} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="contact-text-link"
                  >
                    @crayola_design_studio ↗
                  </a>
                </p>
              </div>
            </div>

            {/* Studio Commitment Badge */}
            <div className="contact-trust-box reveal reveal-delay-2">
              <h4 className="trust-box-title">THE CRAYOLA STANDARD</h4>
              <ul className="trust-box-list">
                <li>
                  <span className="trust-check">✓</span>
                  <span><strong>Zero Guesswork:</strong> 4K digital twins and cinematic walkthroughs before breaking ground.</span>
                </li>
                <li>
                  <span className="trust-check">✓</span>
                  <span><strong>Material Integrity:</strong> Bespoke fluting, natural stone, smoked wood, and architectural lighting.</span>
                </li>
                <li>
                  <span className="trust-check">✓</span>
                  <span><strong>Direct Architect Access:</strong> Direct collaboration with senior principals from initial brief to handoff.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Interactive Consultation & Brief Form */}
          <div className="contact-form-wrapper reveal reveal-delay-1">
            <div className="form-header-box">
              <h2 className="form-main-heading">Project Consultation Brief</h2>
              <p className="form-main-subhead">
                Fill out the parameters below. You can send the brief directly via WhatsApp for instant review or submit via email.
              </p>
            </div>

            {submitted ? (
              <div className="form-success-card">
                <div className="success-icon">✓</div>
                <h3 className="success-title">Inquiry Prepared Successfully</h3>
                <p className="success-text">
                  Your project brief has been formatted. If WhatsApp did not open automatically, tap the button below to connect with our team:
                </p>
                
                <a 
                  href={lastWhatsAppUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-whatsapp-priority"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}
                >
                  <svg className="btn-wa-icon" viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
                    <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.666.776 5.15 2.115 7.24L3 29.5l6.45-1.583A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.717c-2.31 0-4.475-.688-6.287-1.874l-.45-.296-3.83.94 1.03-3.69-.297-.473A11.168 11.168 0 0 1 4.783 16C4.783 9.815 9.815 4.783 16 4.783S27.217 9.815 27.217 16 22.185 27.217 16 27.217zm7.42-8.995c-.407-.203-2.408-1.188-2.78-1.324-.373-.135-.644-.203-.915.204-.271.407-1.05 1.323-1.288 1.595-.237.271-.475.305-.882.102-.407-.204-1.718-.633-3.272-2.02-1.21-1.078-2.026-2.41-2.264-2.817-.237-.407-.025-.627.178-.83.183-.183.407-.475.61-.712.204-.237.272-.407.408-.678.135-.271.068-.509-.034-.712-.102-.204-.916-2.205-1.255-3.02-.33-.794-.666-.686-.915-.698l-.78-.014c-.271 0-.712.102-1.085.509-.373.407-1.424 1.39-1.424 3.391s1.458 3.934 1.662 4.205c.203.271 2.87 4.382 6.953 6.146.971.42 1.73.67 2.321.859.976.31 1.864.266 2.566.162.783-.117 2.408-.984 2.747-1.933.34-.95.34-1.764.238-1.933-.102-.17-.373-.271-.78-.475z"/>
                  </svg>
                  <span>Launch WhatsApp Chat Now</span>
                  <span>→</span>
                </a>

                <div className="success-secondary-actions">
                  <button 
                    type="button" 
                    onClick={handleSendEmail} 
                    className="btn-outline-action"
                  >
                    ✉ Send as Email Instead
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSubmitted(false)} 
                    className="btn-text-action"
                  >
                    ← Edit Information
                  </button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmitWhatsApp}>
                
                {/* Client Name */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input 
                      id="firstName"
                      name="firstName" 
                      type="text" 
                      placeholder="e.g. Rahul" 
                      value={formData.firstName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input 
                      id="lastName"
                      name="lastName" 
                      type="text" 
                      placeholder="e.g. Sharma" 
                      value={formData.lastName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                {/* Contact Phone & Email */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone / WhatsApp *</label>
                    <input 
                      id="phone"
                      name="phone" 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      id="email"
                      name="email" 
                      type="email" 
                      placeholder="rahul@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                {/* Project City & Service */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">Project City / Location *</label>
                    <select 
                      id="city"
                      name="city" 
                      value={formData.city}
                      onChange={handleChange}
                      required
                    >
                      <option value="Bangalore">Bangalore (Karnataka)</option>
                      <option value="Trichy">Trichy (Tamil Nadu)</option>
                      <option value="Hyderabad">Hyderabad (Telangana)</option>
                      <option value="Coimbatore">Coimbatore (Tamil Nadu)</option>
                      <option value="Chennai">Chennai (Tamil Nadu)</option>
                      <option value="Other South Indian Location">Other South Indian Location</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Service Required *</label>
                    <select 
                      id="service"
                      name="service" 
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="Luxury Villa Architecture">Luxury Villa Architecture & Elevation</option>
                      <option value="Interior Design & Styling">Interior Design & Bespoke Joinery</option>
                      <option value="3D ArchViz & 4K Walkthrough">3D ArchViz & 4K Cinematic Walkthrough</option>
                      <option value="Masterplan Layout & Township">Masterplan Layout & Commercial Visuals</option>
                      <option value="Full Turnkey Design (Architecture + Interiors)">Full Turnkey Design (Architecture + Interiors)</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Scale */}
                <div className="form-group">
                  <label htmlFor="area">Estimated Project Scale / Built-Up Area</label>
                  <select 
                    id="area"
                    name="area" 
                    value={formData.area}
                    onChange={handleChange}
                  >
                    <option value="Under 3,000 sq.ft">Compact Luxury (Under 3,000 sq.ft)</option>
                    <option value="3,000 – 6,000 sq.ft">Mid-Scale Villa / Residence (3,000 – 6,000 sq.ft)</option>
                    <option value="6,000 – 15,000 sq.ft">Grand Estate / Compound (6,000 – 15,000 sq.ft)</option>
                    <option value="15,000+ sq.ft / Commercial Township">Commercial Complex / Master Layout (15,000+ sq.ft)</option>
                  </select>
                </div>

                {/* Project Details */}
                <div className="form-group">
                  <label htmlFor="message">Project Vision / Site Notes (Optional)</label>
                  <textarea 
                    id="message"
                    name="message" 
                    rows="4" 
                    placeholder="Tell us about your plot orientation, timeline, architectural preferences, or key milestones..." 
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Action Buttons */}
                <div className="form-action-group">
                  <button type="submit" className="btn-whatsapp-submit">
                    <svg className="btn-wa-icon" viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
                      <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.666.776 5.15 2.115 7.24L3 29.5l6.45-1.583A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.717c-2.31 0-4.475-.688-6.287-1.874l-.45-.296-3.83.94 1.03-3.69-.297-.473A11.168 11.168 0 0 1 4.783 16C4.783 9.815 9.815 4.783 16 4.783S27.217 9.815 27.217 16 22.185 27.217 16 27.217zm7.42-8.995c-.407-.203-2.408-1.188-2.78-1.324-.373-.135-.644-.203-.915.204-.271.407-1.05 1.323-1.288 1.595-.237.271-.475.305-.882.102-.407-.204-1.718-.633-3.272-2.02-1.21-1.078-2.026-2.41-2.264-2.817-.237-.407-.025-.627.178-.83.183-.183.407-.475.61-.712.204-.237.272-.407.408-.678.135-.271.068-.509-.034-.712-.102-.204-.916-2.205-1.255-3.02-.33-.794-.666-.686-.915-.698l-.78-.014c-.271 0-.712.102-1.085.509-.373.407-1.424 1.39-1.424 3.391s1.458 3.934 1.662 4.205c.203.271 2.87 4.382 6.953 6.146.971.42 1.73.67 2.321.859.976.31 1.864.266 2.566.162.783-.117 2.408-.984 2.747-1.933.34-.95.34-1.764.238-1.933-.102-.17-.373-.271-.78-.475z"/>
                    </svg>
                    <span>Send Inquiry via WhatsApp →</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn-email-fallback"
                    onClick={handleSendEmail}
                    title="Send via Email instead"
                  >
                    <span>Prefer Email? Submit via Email ↗</span>
                  </button>
                </div>

                <p className="form-privacy-note">
                  🔒 We respect your confidentiality. Architectural blueprints and project files are never shared with third parties.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
