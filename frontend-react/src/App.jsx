import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Project from './pages/Project';
import { projects } from './data/projects';

function RouteMetaManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Dynamic browser tab title and meta sync
    if (pathname === '/') {
      document.title = 'Crayola Design Studio | Architectural & Interior Design Visualization';
    } else if (pathname === '/portfolio' || pathname === '/work' || pathname === '/projects') {
      document.title = 'Selected Works — Architectural Portfolio | Crayola Design Studio';
    } else if (pathname === '/about') {
      document.title = 'About the Studio | Crayola Design Studio';
    } else if (pathname === '/services') {
      document.title = 'Architecture, Interior & 3D ArchViz Services | Crayola Design Studio';
    } else if (pathname === '/contact') {
      document.title = 'Direct Studio Concierge & Consultations | Crayola Design Studio';
    } else if (pathname.startsWith('/project/')) {
      const slug = pathname.replace('/project/', '');
      const project = projects.find(p => p.id === slug || (p.aliases && p.aliases.includes(slug)));
      if (project) {
        document.title = `${project.title} — ${project.location} | Crayola Design Studio`;
      }
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <RouteMetaManager />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Work />} />
          <Route path="work" element={<Navigate to="/portfolio" replace />} />
          <Route path="projects" element={<Navigate to="/portfolio" replace />} />
          <Route path="project/:slug" element={<Project />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
