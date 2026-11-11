import { useParams, Navigate, Link } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';
import content from '../data/site_content.json';

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const { slug } = useParams();
  const container = useRef();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const projectIndex = projects.findIndex(p => p.id === slug);
  if (projectIndex === -1) {
    return <Navigate to="/portfolio" />;
  }
  
  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % project.images.length);
  }, [project.images.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [project.images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  useGSAP(() => {
    gsap.fromTo('.reveal', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
    );
  }, { scope: container, dependencies: [slug] });

  return (
    <div ref={container} className="page-wrapper">
      {/* Project Hero */}
      <div className="project-hero">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          style={{ objectPosition: project.heroPosition || 'center center' }}
        />
        <button 
          className="hero-lightbox-btn"
          onClick={() => openLightbox(0)}
          aria-label="View full uncropped render"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          <span>EXPAND VIEW</span>
        </button>
        <div className="project-hero-meta">
          <div>
            <h1 className="reveal">{project.title}</h1>
          </div>
          <div className="project-hero-meta-right reveal reveal-delay-1">
            <p>{project.category}</p>
            <p>{project.location}</p>
            <p>{project.year}</p>
          </div>
        </div>
      </div>

      {/* Project Body */}
      <section className="section container">
        <div className="project-body">
          <div className="project-meta-col">
            <div className="project-meta-item reveal">
              <p className="project-meta-label">Service</p>
              <p className="project-meta-value" style={{ textTransform: 'capitalize' }}>{project.category}</p>
            </div>
            <div className="project-meta-item reveal reveal-delay-1">
              <p className="project-meta-label">Location</p>
              <p className="project-meta-value">{project.location}</p>
            </div>
            <div className="project-meta-item reveal reveal-delay-2">
              <p className="project-meta-label">Area</p>
              <p className="project-meta-value">{project.area}</p>
            </div>
            <div className="project-meta-item reveal reveal-delay-3">
              <p className="project-meta-label">Year</p>
              <p className="project-meta-value">{project.year}</p>
            </div>
          </div>
          <div className="project-text">
            {project.description ? project.description.map((para, idx) => (
              <p key={idx} className={`reveal ${idx > 0 ? `reveal-delay-${idx}` : ''}`}>
                {para}
              </p>
            )) : (
              <>
                <p className="reveal">{content.projectPlaceholder}</p>
                <p className="reveal reveal-delay-1">
                  Every detail was considered — from the initial sketches to the final material selection. We focused on creating a seamless flow that enhances both the aesthetic and functional aspects of the environment.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Project Gallery Perspectives */}
      <section className="container project-gallery-section" style={{ marginBottom: '8rem' }}>
        <div className="gallery-section-header reveal">
          <span className="section-eyebrow">ARCHITECTURAL PERSPECTIVES</span>
          <h2 className="gallery-section-title">FULL COMPOSITION GALLERY</h2>
          <p className="gallery-section-sub">Original high-fidelity 3D digital renders — click any view to inspect architectural details</p>
        </div>

        <div className="project-images">
          {project.images.map((imgUrl, idx) => {
            // First image spans full width, subsequent images alternate
            const isFull = idx === 0 || idx === 3;
            return (
              <div 
                key={idx} 
                className={`project-image-card ${isFull ? 'full' : 'half'} reveal`}
                onClick={() => openLightbox(idx)}
              >
                <div className="project-image-inner">
                  <img 
                    src={imgUrl} 
                    alt={`${project.title} perspective ${idx + 1}`} 
                    loading="lazy"
                  />
                  <div className="project-image-overlay">
                    <span className="image-expand-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      VIEW FULL RESOLUTION
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Next Project */}
      <Link to={`/project/${nextProject.id}`} className="next-project">
        <div>
          <p className="next-label">Next Project</p>
          <h3>{nextProject.title}</h3>
        </div>
        <span className="arrow">→</span>
      </Link>

      {/* Full-Screen Architectural Lightbox Modal */}
      {lightboxOpen && (
        <div className="cds-lightbox" onClick={closeLightbox}>
          <div className="lightbox-backdrop" />
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-top-bar">
              <div className="lightbox-meta">
                <span className="lightbox-counter">
                  {String(lightboxIndex + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
                </span>
                <span className="lightbox-sep">|</span>
                <span className="lightbox-title">{project.title}</span>
              </div>
              <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close viewer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="lightbox-image-stage">
              <button 
                className="lightbox-nav-btn prev" 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                aria-label="Previous image"
              >
                ‹
              </button>

              <img 
                key={lightboxIndex}
                className="lightbox-img" 
                src={project.images[lightboxIndex]} 
                alt={`${project.title} full render ${lightboxIndex + 1}`} 
              />

              <button 
                className="lightbox-nav-btn next" 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            <div className="lightbox-footer">
              <p>Press ESC to exit · Arrow keys to navigate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
