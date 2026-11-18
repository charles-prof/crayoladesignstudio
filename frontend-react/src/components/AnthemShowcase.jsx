import { useState, useRef } from 'react';

/**
 * AnthemShowcase — Dual-Genre Gallery & Cinematic Video Walkthrough
 * 
 * Showcases Anthem Villa with:
 * 1. An embedded cinematic 4-minute 1080p architectural walkthrough film.
 * 2. An interactive dual-genre gallery allowing visitors to seamlessly filter
 *    between "Spatial Architecture & Living Suites" and "Macro Details & Materiality (Close-Ups)".
 */
export default function AnthemShowcase({ project, openLightbox }) {
  const [activeGenre, setActiveGenre] = useState('all'); // 'all' | 'spatial' | 'details'
  const videoRef = useRef(null);

  const spatialImages = project.genreSpatial || [];
  const detailImages = project.genreDetails || [];

  const displayImages = activeGenre === 'all'
    ? project.images
    : activeGenre === 'spatial'
      ? spatialImages
      : detailImages;

  return (
    <div className="anthem-showcase-container">
      {/* 1. Cinematic Walkthrough Film Section */}
      {project.videoWalkthrough && (
        <section className="container anthem-cinema-section">
          <div className="cinema-header reveal">
            <span className="cinema-eyebrow">CINEMATIC ARCHITECTURAL FILM · 4K WALKTHROUGH</span>
            <h2 className="cinema-title">A Journey Through Anthem Villa</h2>
            <p className="cinema-subtitle">
              Experience the spatial flow, monumental cantilevered geometry, and twilight lighting transitions across interior and exterior entertaining zones in continuous motion.
            </p>
          </div>

          <div className="cinema-player-wrapper reveal reveal-delay-1">
            <div className="cinema-badge-bar">
              <span className="cinema-status-dot" />
              <span className="cinema-tag">OFFICIAL ARCHITECTURAL FILM · N STUDIOS</span>
              <span className="cinema-duration">04:26 · 1080P FULL HD</span>
            </div>
            <video
              ref={videoRef}
              className="cinema-video"
              controls
              playsInline
              preload="metadata"
              poster={project.thumbnail}
            >
              <source src={project.videoWalkthrough} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      )}

      {/* 2. Dual-Genre Architectural Gallery */}
      <section className="container anthem-gallery-section" style={{ marginTop: '6rem', marginBottom: '8rem' }}>
        <div className="gallery-section-header reveal">
          <span className="section-eyebrow">DUAL-GENRE ARCHITECTURAL PORTFOLIO</span>
          <h2 className="gallery-section-title">Comprehensive Spatial & Detail Gallery</h2>
          <p className="gallery-section-sub">
            Toggle between broad spatial perspectives and macro material craftsmanship to explore every facet of the residence.
          </p>

          {/* Genre Switcher Pills */}
          <div className="genre-filters-bar">
            <button
              type="button"
              className={`genre-filter-btn ${activeGenre === 'all' ? 'active' : ''}`}
              onClick={() => setActiveGenre('all')}
            >
              All Compositions <span className="genre-count">{project.images?.length || 0}</span>
            </button>
            <button
              type="button"
              className={`genre-filter-btn ${activeGenre === 'spatial' ? 'active' : ''}`}
              onClick={() => setActiveGenre('spatial')}
            >
              Spatial Architecture & Living <span className="genre-count">{spatialImages.length}</span>
            </button>
            <button
              type="button"
              className={`genre-filter-btn ${activeGenre === 'details' ? 'active' : ''}`}
              onClick={() => setActiveGenre('details')}
            >
              Macro Details & Materiality <span className="genre-count">{detailImages.length}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Image Grid */}
        <div className="project-images anthem-grid">
          {displayImages.map((imgObj, idx) => {
            const imgUrl = typeof imgObj === 'string' ? imgObj : imgObj.url;
            const imgTitle = typeof imgObj === 'string' ? `Perspective 0${idx + 1}` : imgObj.title;
            const imgCategory = typeof imgObj === 'string' ? 'Architectural View' : imgObj.genre;
            
            // In 'all' view, first item is full width, then alternating pairs
            const isFull = activeGenre === 'all' ? (idx === 0 || idx === 5 || idx === 11) : (idx === 0);

            // Lightbox index lookup in main project.images array
            const masterIdx = project.images.findIndex(item => (typeof item === 'string' ? item : item.url) === imgUrl);

            return (
              <div
                key={imgUrl + idx}
                className={`project-image-card ${isFull ? 'full' : 'half'} reveal`}
                onClick={() => openLightbox(masterIdx >= 0 ? masterIdx : idx)}
              >
                <div className="project-image-inner">
                  <img
                    src={imgUrl}
                    alt={imgTitle}
                    loading="lazy"
                  />
                  <div className="project-image-overlay">
                    <div className="anthem-card-caption">
                      <span className="card-cat-badge">{imgCategory}</span>
                      <h4 className="card-title-text">{imgTitle}</h4>
                    </div>
                    <span className="image-expand-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      EXPAND VIEW
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
