import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isSolidHeader = location.pathname !== '/';

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
            <span className="mobile-cities-tag">Bangalore · Trichy · Hyderabad · Coimbatore</span>
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

          <div className="mobile-nav-footer">
            <div className="mobile-nav-contact">
              <span className="footer-label">GET IN TOUCH</span>
              <a href="https://www.instagram.com/crayola_design_studio/" target="_blank" rel="noreferrer" className="mobile-insta-link">
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
        <div className="footer-logo">
          <NavLink to="/">
            <img src="/logo.png" alt="Crayola Design Studio" />
          </NavLink>
        </div>
        <div className="footer-links">
          <NavLink to="/portfolio">Work</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <a href="https://www.instagram.com/crayola_design_studio/" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
        <p>© 2026 Crayola Design Studio</p>
      </footer>
    </>
  );
}
