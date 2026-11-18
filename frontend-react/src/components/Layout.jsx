import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WhatsAppWidget from './WhatsAppWidget';
import content from '../data/site_content.json';

export default function Layout() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isSolidHeader = location.pathname !== '/';

  const studioPhone = content.contact?.phone || '+91 96987 53213';
  const whatsappNum = content.contact?.whatsappNumber || '919698753213';
  const studioEmail = content.contact?.email || 'crayoladesignstudio@gmail.com';

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  // Lock body scroll when mobile menu is active
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div id="progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Header */}
      <header className={`site-header ${isSolidHeader ? 'solid' : ''} ${isScrolled ? 'scrolled' : ''}`} id="site-header">
        <div className="logo">
          <NavLink to="/" onClick={closeMobileMenu}>
            <img 
              src={isSolidHeader || isScrolled ? "/logo-dark.png" : "/logo.png"} 
              alt="Crayola Design Studio" 
            />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>Work</NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>Services</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>

          {/* Desktop Direct WhatsApp Header Pill */}
          <a 
            href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello Crayola Design Studio, I would like to consult with your lead architect regarding our upcoming project.')}`}
            target="_blank" 
            rel="noreferrer" 
            className="header-wa-btn"
            title="Chat directly on WhatsApp with our design team"
          >
            <span className="header-wa-pulse" />
            <svg className="header-wa-svg" viewBox="0 0 32 32" width="14" height="14" fill="currentColor">
              <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.666.776 5.15 2.115 7.24L3 29.5l6.45-1.583A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.717c-2.31 0-4.475-.688-6.287-1.874l-.45-.296-3.83.94 1.03-3.69-.297-.473A11.168 11.168 0 0 1 4.783 16C4.783 9.815 9.815 4.783 16 4.783S27.217 9.815 27.217 16 22.185 27.217 16 27.217zm7.42-8.995c-.407-.203-2.408-1.188-2.78-1.324-.373-.135-.644-.203-.915.204-.271.407-1.05 1.323-1.288 1.595-.237.271-.475.305-.882.102-.407-.204-1.718-.633-3.272-2.02-1.21-1.078-2.026-2.41-2.264-2.817-.237-.407-.025-.627.178-.83.183-.183.407-.475.61-.712.204-.237.272-.407.408-.678.135-.271.068-.509-.034-.712-.102-.204-.916-2.205-1.255-3.02-.33-.794-.666-.686-.915-.698l-.78-.014c-.271 0-.712.102-1.085.509-.373.407-1.424 1.39-1.424 3.391s1.458 3.934 1.662 4.205c.203.271 2.87 4.382 6.953 6.146.971.42 1.73.67 2.321.859.976.31 1.864.266 2.566.162.783-.117 2.408-.984 2.747-1.933.34-.95.34-1.764.238-1.933-.102-.17-.373-.271-.78-.475z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        </nav>

        {/* Mobile Hamburger Toggle Button (44x44px touch target) */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line line-1"></span>
          <span className="hamburger-line line-2"></span>
        </button>
      </header>

      {/* Full-Screen Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-nav-backdrop" onClick={closeMobileMenu} />
        
        <div className="mobile-nav-content">
          <div className="mobile-nav-top">
            <span className="mobile-brand-tag">CRAYOLA DESIGN STUDIO</span>
            <span className="mobile-cities-tag">{content.contact?.cities || 'Bangalore · Trichy'}</span>
          </div>

          <nav className="mobile-nav-links">
            <NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="nav-idx">01</span>
              <span className="nav-name">Home</span>
            </NavLink>
            <NavLink to="/portfolio" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="nav-idx">02</span>
              <span className="nav-name">Work</span>
            </NavLink>
            <NavLink to="/services" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="nav-idx">03</span>
              <span className="nav-name">Services</span>
            </NavLink>
            <NavLink to="/about" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="nav-idx">04</span>
              <span className="nav-name">About</span>
            </NavLink>
            <NavLink to="/contact" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="nav-idx">05</span>
              <span className="nav-name">Contact</span>
            </NavLink>
          </nav>

          {/* Direct Mobile WhatsApp Quick-Action */}
          <div className="mobile-drawer-cta">
            <a 
              href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello Crayola Design Studio, I would like to consult with your lead architect regarding our project.')}`}
              target="_blank" 
              rel="noreferrer" 
              className="mobile-drawer-wa-btn"
              onClick={closeMobileMenu}
            >
              <svg className="mobile-drawer-wa-icon" viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
                <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.666.776 5.15 2.115 7.24L3 29.5l6.45-1.583A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.717c-2.31 0-4.475-.688-6.287-1.874l-.45-.296-3.83.94 1.03-3.69-.297-.473A11.168 11.168 0 0 1 4.783 16C4.783 9.815 9.815 4.783 16 4.783S27.217 9.815 27.217 16 22.185 27.217 16 27.217zm7.42-8.995c-.407-.203-2.408-1.188-2.78-1.324-.373-.135-.644-.203-.915.204-.271.407-1.05 1.323-1.288 1.595-.237.271-.475.305-.882.102-.407-.204-1.718-.633-3.272-2.02-1.21-1.078-2.026-2.41-2.264-2.817-.237-.407-.025-.627.178-.83.183-.183.407-.475.61-.712.204-.237.272-.407.408-.678.135-.271.068-.509-.034-.712-.102-.204-.916-2.205-1.255-3.02-.33-.794-.666-.686-.915-.698l-.78-.014c-.271 0-.712.102-1.085.509-.373.407-1.424 1.39-1.424 3.391s1.458 3.934 1.662 4.205c.203.271 2.87 4.382 6.953 6.146.971.42 1.73.67 2.321.859.976.31 1.864.266 2.566.162.783-.117 2.408-.984 2.747-1.933.34-.95.34-1.764.238-1.933-.102-.17-.373-.271-.78-.475z"/>
              </svg>
              <span>Chat on WhatsApp ({studioPhone})</span>
            </a>
          </div>

          <div className="mobile-nav-footer">
            <div className="mobile-nav-contact">
              <span className="footer-label">DIRECT INQUIRIES</span>
              <a href={`tel:${content.contact?.phoneRaw || '+919698753213'}`} className="mobile-contact-line">
                📞 {studioPhone}
              </a>
              <a href={`mailto:${studioEmail}`} className="mobile-contact-line">
                ✉ {studioEmail}
              </a>
              <a href={content.contact?.instagramUrl || "https://www.instagram.com/crayola_design_studio/"} target="_blank" rel="noreferrer" className="mobile-insta-link">
                @crayola_design_studio ↗
              </a>
            </div>
            <p className="mobile-tagline">Architectural & Interior Design · South India</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-main-row">
          <div className="footer-logo">
            <NavLink to="/">
              <img src="/logo.png" alt="Crayola Design Studio" />
            </NavLink>
          </div>
          
          {/* Footer Contact Coordinates */}
          <div className="footer-contact-block">
            <span className="footer-contact-title">DIRECT INQUIRIES</span>
            <a href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello Crayola Design Studio, I would like to inquire about your architectural design services.')}`} target="_blank" rel="noreferrer" className="footer-wa-link">
              <span className="footer-wa-dot" />
              <span>WhatsApp: {studioPhone}</span>
            </a>
            <a href={`mailto:${studioEmail}`} className="footer-email-link">
              {studioEmail}
            </a>
          </div>

          <div className="footer-links">
            <NavLink to="/portfolio">Work</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <a href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noreferrer">WhatsApp ↗</a>
            <a href={content.contact?.instagramUrl || "https://www.instagram.com/crayola_design_studio/"} target="_blank" rel="noreferrer">Instagram ↗</a>
          </div>
        </div>

        {/* Footer Studio Physical Offices */}
        <div className="footer-offices-row">
          <div className="footer-office-col">
            <span className="footer-office-badge">TRICHY STUDIO</span>
            <p className="footer-office-name">Vishwa Homes</p>
            <p className="footer-office-desc">
              No. 10/D2, Radha Krishnan Colony 5th Cross, Sasdri Road, Tennur, Trichy - 620017
            </p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Vishwa+homes+Radha+krishnan+colony+5th+cross+Sasdri+road+Tennur+Trichy+620017" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-maps-link"
            >
              Get Directions ↗
            </a>
          </div>
          <div className="footer-office-col">
            <span className="footer-office-badge">BANGALORE STUDIO</span>
            <p className="footer-office-name">Hustlehub Tech Park</p>
            <p className="footer-office-desc">
              36/5, Somasundarapalya, 27th Main Rd, Sector 2, HSR Layout, Bengaluru - 560102
            </p>
            <a 
              href="https://maps.app.goo.gl/zmPooNU9JzCFq8js6" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-maps-link"
            >
              Get Directions ↗
            </a>
          </div>
        </div>
        
        <p className="footer-copyright">© 2026 Crayola Design Studio · Bangalore · Trichy</p>
      </footer>

      {/* Global Floating WhatsApp Concierge Desk */}
      <WhatsAppWidget />
    </>
  );
}
