import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isSolidHeader = location.pathname !== '/';

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

  return (
    <>
      {/* Scroll Progress Bar */}
      <div id="progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Header */}
      <header className={`site-header ${isSolidHeader ? 'solid' : ''} ${isScrolled ? 'scrolled' : ''}`} id="site-header">
        <div className="logo">
          <NavLink to="/">
            <img src="/logo.png" alt="Crayola Design Studio" />
          </NavLink>
        </div>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>Work</NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>Services</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-logo">
          <img src="/logo.png" alt="Crayola Design Studio" height="36" style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
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
