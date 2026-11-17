import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo('.reveal', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
    );
  }, { scope: container, dependencies: [filter] });

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div ref={container} className="page-wrapper">
      <section className="page-hero">
        <p className="page-hero-eyebrow reveal">Portfolio</p>
        <h1 className="reveal reveal-delay-1">Selected<br/>Works.</h1>
      </section>

      <section className="section container">
        <div className="portfolio-filters-wrap reveal">
          <div className="portfolio-filters">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Works</button>
            <button className={`filter-btn ${filter === 'interior' ? 'active' : ''}`} onClick={() => setFilter('interior')}>Interior</button>
            <button className={`filter-btn ${filter === 'exterior' ? 'active' : ''}`} onClick={() => setFilter('exterior')}>Exterior</button>
            <button className={`filter-btn ${filter === '3d-viz' ? 'active' : ''}`} onClick={() => setFilter('3d-viz')}>3D Visualizations</button>
          </div>
        </div>

        <div className="portfolio-grid" style={{ marginTop: '4rem' }}>
          {filteredProjects.map((project, idx) => (
            <Link to={`/project/${project.id}`} key={project.id} className="portfolio-card reveal" style={{ transitionDelay: `${(idx % 3) * 0.1}s` }}>
              <div className="card-image" style={{ position: 'relative' }}>
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  loading="lazy"
                  style={{ objectPosition: project.cardPosition || project.heroPosition || 'center 50%' }}
                />
                {project.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    background: 'rgba(12, 12, 12, 0.85)',
                    backdropFilter: 'blur(6px)',
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
                    {project.badge}
                  </span>
                )}
              </div>
              <h3>{project.title}</h3>
              <p className="card-cat">
                {project.category === '3d-viz' ? '3D Visualization' : project.category} · {project.location}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
