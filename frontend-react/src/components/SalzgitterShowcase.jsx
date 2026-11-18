import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import content from '../data/site_content.json';

/**
 * SalzgitterShowcase — Industrial Product Visualization & Commercial 3D Reel
 * 
 * Showcases Salzgitter Luxury Elevators with:
 * 1. 16-second vertical 9:16 commercial reel player with kiosk frame & audio/playback controls.
 * 2. Interactive Cabin Materiality Switcher (Champagne Rose Gold, Brushed Metal Mirror, Teak Wood, Frosted Glass).
 * 3. Macro Engineering & Architectural Lobby Integration gallery.
 * 4. Dedicated B2B Product Manufacturer conversion desk.
 */
export default function SalzgitterShowcase({ project, openLightbox }) {
  const [selectedFinishIdx, setSelectedFinishIdx] = useState(0);
  const [isPlayingReel, setIsPlayingReel] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const reelVideoRef = useRef(null);

  const finishes = project.finishes || [];
  const currentFinish = finishes[selectedFinishIdx] || finishes[0];
  const details = project.details || [];
  const whatsappNum = content.contact?.whatsappNumber || '919698753213';
  const studioPhone = content.contact?.phone || '+91 96987 53213';

  const togglePlay = () => {
    if (!reelVideoRef.current) return;
    if (reelVideoRef.current.paused) {
      reelVideoRef.current.play();
      setIsPlayingReel(true);
    } else {
      reelVideoRef.current.pause();
      setIsPlayingReel(false);
    }
  };

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (!reelVideoRef.current) return;
    reelVideoRef.current.muted = !reelVideoRef.current.muted;
    setIsMuted(reelVideoRef.current.muted);
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    if (!reelVideoRef.current) return;
    if (reelVideoRef.current.requestFullscreen) {
      reelVideoRef.current.requestFullscreen();
    } else if (reelVideoRef.current.webkitRequestFullscreen) {
      reelVideoRef.current.webkitRequestFullscreen();
    }
  };

  // Find index in project.images for lightbox
  const getLightboxIndexForFinish = (finishImg) => {
    const idx = project.images.findIndex((img) => img === finishImg);
    return idx >= 0 ? idx : 0;
  };

  const b2bWhatsAppMessage = encodeURIComponent(
    'Hello Crayola Design Studio, I would like to consult with your 3D team regarding Product Visualization & Commercial Reels for our manufactured product catalog.'
  );

  return (
    <div className="salzgitter-showcase-container">
      {/* ========================================================= */}
      {/* 1. Commercial Product Reel (Vertical 9:16 Kiosk Showcase) */}
      {/* ========================================================= */}
      <section className="container product-reel-section">
        <div className="product-reel-layout">
          {/* Reel Narrative Column */}
          <div className="reel-narrative-col reveal">
            <div className="reel-category-badge">
              <span className="live-sparkle-dot" />
              <span>B2B COMMERCIAL REEL · 9:16 VERTICAL SPOTLIGHT</span>
            </div>
            <h2 className="reel-heading">
              Cinematic Product Motion & Digital Identity.
            </h2>
            <p className="reel-description">
              Engineered for high-impact social marketing, luxury manufacturer showrooms, and international architectural trade pavilions. We transform industrial CAD engineering files into photorealistic motion digital twins with real-time lighting physics and material reflections.
            </p>

            <div className="reel-specs-grid">
              <div className="reel-spec-item">
                <span className="spec-label">CLIENT / BRAND</span>
                <span className="spec-value">{project.client || 'Salzgitter Lifts'}</span>
              </div>
              <div className="reel-spec-item">
                <span className="spec-label">DISCIPLINE</span>
                <span className="spec-value">Industrial Product CGI & Motion Reel</span>
              </div>
              <div className="reel-spec-item">
                <span className="spec-label">ASPECT RATIO</span>
                <span className="spec-value">9:16 Vertical (1080 × 1920 Full HD)</span>
              </div>
              <div className="reel-spec-item">
                <span className="spec-label">DELIVERABLES</span>
                <span className="spec-value">Social Reel · 4K Stills · Spec Catalog</span>
              </div>
            </div>

            <div className="reel-b2b-action">
              <a
                href={`https://wa.me/${whatsappNum}?text=${b2bWhatsAppMessage}`}
                target="_blank"
                rel="noreferrer"
                className="btn-reel-b2b"
                title="Consult on Product CGI & Commercial 3D Reels"
              >
                <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                  <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.666.776 5.15 2.115 7.24L3 29.5l6.45-1.583A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.717c-2.31 0-4.475-.688-6.287-1.874l-.45-.296-3.83.94 1.03-3.69-.297-.473A11.168 11.168 0 0 1 4.783 16C4.783 9.815 9.815 4.783 16 4.783S27.217 9.815 27.217 16 22.185 27.217 16 27.217zm7.42-8.995c-.407-.203-2.408-1.188-2.78-1.324-.373-.135-.644-.203-.915.204-.271.407-1.05 1.323-1.288 1.595-.237.271-.475.305-.882.102-.407-.204-1.718-.633-3.272-2.02-1.21-1.078-2.026-2.41-2.264-2.817-.237-.407-.025-.627.178-.83.183-.183.407-.475.61-.712.204-.237.272-.407.408-.678.135-.271.068-.509-.034-.712-.102-.204-.916-2.205-1.255-3.02-.33-.794-.666-.686-.915-.698l-.78-.014c-.271 0-.712.102-1.085.509-.373.407-1.424 1.39-1.424 3.391s1.458 3.934 1.662 4.205c.203.271 2.87 4.382 6.953 6.146.971.42 1.73.67 2.321.859.976.31 1.864.266 2.566.162.783-.117 2.408-.984 2.747-1.933.34-.95.34-1.764.238-1.933-.102-.17-.373-.271-.78-.475z"/>
                </svg>
                <span>COMMISSION PRODUCT REEL</span>
              </a>
            </div>
          </div>

          {/* Vertical Kiosk Player Column */}
          <div className="reel-kiosk-col reveal reveal-delay-1">
            <div className="reel-device-frame">
              <div className="reel-notch-bar">
                <span className="notch-pill" />
                <span className="reel-badge-tag">SALZGITTER 4K DIGITAL TWIN</span>
              </div>

              <div className="reel-video-container" onClick={togglePlay}>
                <video
                  ref={reelVideoRef}
                  src={project.videoReel}
                  poster={project.reelPoster || project.thumbnail}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="reel-video-element"
                />

                {/* Floating Play / Pause Overlay Hint */}
                {!isPlayingReel && (
                  <div className="reel-pause-overlay">
                    <span className="play-icon-triangle">▶</span>
                  </div>
                )}

                {/* Controls Ribbon */}
                <div className="reel-controls-ribbon" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="reel-control-btn"
                    onClick={togglePlay}
                    aria-label={isPlayingReel ? 'Pause video' : 'Play video'}
                  >
                    <span>{isPlayingReel ? 'PAUSE' : 'PLAY'}</span>
                  </button>

                  <button
                    type="button"
                    className="reel-control-btn"
                    onClick={toggleAudio}
                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                  >
                    <span>{isMuted ? 'UNMUTE 🔈' : 'MUTE 🔊'}</span>
                  </button>

                  <button
                    type="button"
                    className="reel-control-btn expand"
                    onClick={handleFullscreen}
                    aria-label="Expand fullscreen"
                  >
                    <span>EXPAND ↗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. Interactive Cabin Materiality Switcher */}
      {/* ========================================================= */}
      <section className="container product-finishes-section">
        <div className="finishes-header reveal">
          <span className="section-eyebrow">CABIN FINISH CUSTOMIZATION · INDUSTRIAL DIGITAL TWIN</span>
          <h2 className="finishes-title">Interactive Materiality Explorer</h2>
          <p className="finishes-subtitle">
            Toggle between custom architectural cabin finishes. We calibrate physically based shaders (PBR) to emulate exact surface micro-roughness, specular sheen, and ambient lighting diffusion.
          </p>
        </div>

        {/* Finish Selector Tabs */}
        <div className="finishes-nav-bar reveal reveal-delay-1">
          {finishes.map((finish, idx) => (
            <button
              key={finish.id}
              type="button"
              className={`finish-nav-tab ${selectedFinishIdx === idx ? 'active' : ''}`}
              onClick={() => setSelectedFinishIdx(idx)}
            >
              <span className="tab-idx">0{idx + 1}</span>
              <span className="tab-name">{finish.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Finish Active Showcase */}
        {currentFinish && (
          <div className="finish-display-card reveal reveal-delay-2">
            <div className="finish-image-stage" onClick={() => openLightbox(getLightboxIndexForFinish(currentFinish.image))}>
              <img
                src={currentFinish.image}
                alt={currentFinish.name}
                className="finish-active-img"
              />
              <div className="finish-stage-hint">
                <span>Click to inspect 4K texture details</span>
              </div>
            </div>

            <div className="finish-specs-panel">
              <div className="finish-panel-top">
                <span className="finish-type-badge">{currentFinish.finishType}</span>
                <h3 className="finish-panel-title">{currentFinish.name}</h3>
                <p className="finish-panel-desc">{currentFinish.desc}</p>
              </div>

              <div className="finish-spec-box">
                <span className="spec-box-label">SPECIFICATIONS & SHADER CALIBRATION</span>
                <p className="spec-box-text">{currentFinish.spec}</p>
              </div>

              <div className="finish-panel-actions">
                <button
                  type="button"
                  className="btn-inspect-finish"
                  onClick={() => openLightbox(getLightboxIndexForFinish(currentFinish.image))}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  <span>INSPECT FULL RESOLUTION</span>
                </button>

                <a
                  href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello Crayola team, I am interested in Product Visualization and 3D Digital Twins similar to the ${currentFinish.name} elevator finish.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-finish-wa"
                  title="Inquire about custom product finishes"
                >
                  <span>Inquire for Custom Finish →</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 3. Engineering Craft & Architectural Integration Gallery */}
      {/* ========================================================= */}
      <section className="container product-details-section">
        <div className="gallery-section-header reveal">
          <span className="section-eyebrow">MACRO DETAILS & ARCHITECTURAL INTEGRATION</span>
          <h2 className="gallery-section-title">Engineering Precision & Context</h2>
          <p className="gallery-section-sub">
            From CNC-machined operating button bevels to monumental Italian marble lobby portals — click any view to inspect 4K CGI fidelity.
          </p>
        </div>

        <div className="product-details-grid">
          {details.map((item, idx) => (
            <div
              key={idx}
              className="product-detail-card reveal"
              onClick={() => openLightbox(getLightboxIndexForFinish(item.image))}
            >
              <div className="detail-card-img-wrap">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="detail-card-overlay">
                  <span>VIEW FULL RESOLUTION ↗</span>
                </div>
              </div>
              <div className="detail-card-meta">
                <span className="detail-card-sub">{item.subtitle}</span>
                <h4 className="detail-card-title">{item.title}</h4>
                <p className="detail-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. Manufacturer B2B Conversion Lounge */}
      {/* ========================================================= */}
      <section className="container product-b2b-cta-section">
        <div className="product-b2b-card reveal">
          <div className="b2b-card-content">
            <span className="b2b-card-eyebrow">B2B COMMERCIAL VISUALIZATION</span>
            <h3 className="b2b-card-title">
              Ready to elevate your manufactured product catalog?
            </h3>
            <p className="b2b-card-text">
              We partner with industrial manufacturers, luxury hardware brands, elevator companies, and architectural fixture designers across South India and international markets to produce photorealistic 3D digital twins, commercial social reels, and high-converting marketing imagery.
            </p>
          </div>

          <div className="b2b-card-actions">
            <a
              href={`https://wa.me/${whatsappNum}?text=${b2bWhatsAppMessage}`}
              target="_blank"
              rel="noreferrer"
              className="btn-b2b-priority"
            >
              <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
                <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.666.776 5.15 2.115 7.24L3 29.5l6.45-1.583A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.717c-2.31 0-4.475-.688-6.287-1.874l-.45-.296-3.83.94 1.03-3.69-.297-.473A11.168 11.168 0 0 1 4.783 16C4.783 9.815 9.815 4.783 16 4.783S27.217 9.815 27.217 16 22.185 27.217 16 27.217zm7.42-8.995c-.407-.203-2.408-1.188-2.78-1.324-.373-.135-.644-.203-.915.204-.271.407-1.05 1.323-1.288 1.595-.237.271-.475.305-.882.102-.407-.204-1.718-.633-3.272-2.02-1.21-1.078-2.026-2.41-2.264-2.817-.237-.407-.025-.627.178-.83.183-.183.407-.475.61-.712.204-.237.272-.407.408-.678.135-.271.068-.509-.034-.712-.102-.204-.916-2.205-1.255-3.02-.33-.794-.666-.686-.915-.698l-.78-.014c-.271 0-.712.102-1.085.509-.373.407-1.424 1.39-1.424 3.391s1.458 3.934 1.662 4.205c.203.271 2.87 4.382 6.953 6.146.971.42 1.73.67 2.321.859.976.31 1.864.266 2.566.162.783-.117 2.408-.984 2.747-1.933.34-.95.34-1.764.238-1.933-.102-.17-.373-.271-.78-.475z"/>
              </svg>
              <span>Consult on Product CGI & Reels</span>
            </a>
            <Link to="/contact" className="btn-b2b-outline">
              Request B2B Quotation Desk →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
