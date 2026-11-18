import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import content from '../data/site_content.json';

export default function Services() {
  const container = useRef();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const whatsappNum = content.contact?.whatsappNumber || '919698753213';

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const openFullscreen = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  useGSAP(() => {
    gsap.fromTo('.reveal', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
    );
  }, { scope: container });

  return (
    <div ref={container} className="page-wrapper">
      <section className="page-hero">
        <p className="page-hero-eyebrow reveal">What We Do</p>
        <h1 className="reveal reveal-delay-1">Design from<br/>concept to<br/>completion.</h1>
      </section>

      <section className="section container">
        <div className="service-row">
          <img 
            src="/projects/mr-amar/hero-living.webp" 
            alt="Interior Design — Mr. Amar Residence" 
            style={{ objectPosition: 'center 50%' }} 
          />
          <div className="service-content">
            <p className="service-content-num reveal">01 — {content.services.interiorDesign.heading}</p>
            <h2 className="reveal reveal-delay-1">{content.services.interiorDesign.oneLiner}</h2>
            <p className="reveal reveal-delay-2">{content.services.interiorDesign.description}</p>
          </div>
        </div>
      </section>

      <section className="section-sm container">
        <div className="service-row">
          <img 
            src="/projects/yk-builders/hero-aaron.webp" 
            alt="Exterior Architecture — YK Builders Chennai" 
            style={{ objectPosition: 'center 45%' }} 
          />
          <div className="service-content">
            <p className="service-content-num reveal">02 — {content.services.exteriorDesign.heading}</p>
            <h2 className="reveal reveal-delay-1">{content.services.exteriorDesign.oneLiner}</h2>
            <p className="reveal reveal-delay-2">{content.services.exteriorDesign.description}</p>
          </div>
        </div>
      </section>

      <section className="section-sm container">
        <div className="service-row">
          <div className="service-video-container reveal">
            <video 
              ref={videoRef}
              src="/videos/services-3d-walkthrough.mp4" 
              poster="/videos/services-3d-walkthrough-poster.webp"
              autoPlay 
              loop 
              muted 
              playsInline 
              className="service-video"
              onClick={togglePlay}
            />
            
            {/* Live Video Pill Badge */}
            <div className="service-video-badge">
              <span className="live-dot"></span>
              <span>4K CINEMATIC WALKTHROUGH</span>
            </div>

            {/* Floating Action Controls */}
            <div className="service-video-controls">
              <button 
                type="button" 
                className="service-video-btn" 
                onClick={toggleAudio}
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
                aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
              >
                {isMuted ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <line x1="23" y1="9" x2="17" y2="15"/>
                    <line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                )}
                <span>{isMuted ? "AUDIO OFF" : "AUDIO ON"}</span>
              </button>

              <button 
                type="button" 
                className="service-video-btn" 
                onClick={togglePlay}
                title={isPlaying ? "Pause" : "Play"}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                )}
              </button>

              <button 
                type="button" 
                className="service-video-btn expand-btn" 
                onClick={openFullscreen}
                title="Expand Fullscreen"
                aria-label="Expand Fullscreen"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
                <span>EXPAND</span>
              </button>
            </div>
          </div>

          <div className="service-content">
            <p className="service-content-num reveal">03 — {content.services.archViz.heading}</p>
            <h2 className="reveal reveal-delay-1">{content.services.archViz.oneLiner}</h2>
            <p className="reveal reveal-delay-2">{content.services.archViz.description}</p>
            <div className="service-actions reveal reveal-delay-3" style={{ marginTop: '2.5rem' }}>
              <Link to="/project/anthem-villa" className="btn-solid-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                <span>EXPLORE WALKTHROUGH PROJECT</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Capabilities Scope Matrix (2D Technical · 3D Photoreal · Advanced Immersive Lab) */}
      <section id="scope-matrix" className="section container studio-scope-section">
        <div className="scope-section-header">
          <span className="scope-section-eyebrow reveal">{content.scopeMatrix?.eyebrow || 'COMPREHENSIVE STUDIO SCOPE'}</span>
          <h2 className="scope-section-title reveal reveal-delay-1">{content.scopeMatrix?.heading}</h2>
          <p className="scope-section-subtext reveal reveal-delay-2">{content.scopeMatrix?.subheading}</p>
        </div>

        <div className="scope-grid">
          {content.scopeMatrix?.tiers?.map((tier, idx) => (
            <div 
              key={tier.id} 
              className={`scope-card reveal reveal-delay-${idx + 1} ${tier.isAdvanced ? 'advanced-card' : ''}`}
            >
              <div className="scope-card-top">
                <div className="scope-card-badge-wrap">
                  <span className={`scope-phase-badge ${tier.isAdvanced ? 'advanced-badge' : ''}`}>
                    {tier.isAdvanced && <span className="live-sparkle-dot" />}
                    {tier.badge}
                  </span>
                  {tier.isAdvanced && (
                    <span className="scope-status-chip">NEXT OFFER SCOPE</span>
                  )}
                </div>
                <h3 className="scope-card-title">{tier.title}</h3>
                <p className="scope-card-tagline">{tier.tagline}</p>
              </div>

              <div className="scope-card-divider" />

              <div className="scope-card-deliverables">
                <p className="deliverables-heading">DELIVERABLES SCOPE</p>
                <ul className="deliverables-list">
                  {tier.deliverables?.map((item, dIdx) => (
                    <li key={dIdx} className="deliverable-item">
                      <span className="deliverable-bullet">
                        {tier.isAdvanced ? '◆' : '✓'}
                      </span>
                      <span className="deliverable-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="scope-card-footer">
                {tier.isAdvanced ? (
                  <div className="advanced-action-group">
                    <a
                      href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(tier.whatsappPrompt)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-scope-wa"
                      title="Direct Consultation on Phase 2 / Advanced VR Scope"
                    >
                      <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                        <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.666.776 5.15 2.115 7.24L3 29.5l6.45-1.583A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.717c-2.31 0-4.475-.688-6.287-1.874l-.45-.296-3.83.94 1.03-3.69-.297-.473A11.168 11.168 0 0 1 4.783 16C4.783 9.815 9.815 4.783 16 4.783S27.217 9.815 27.217 16 22.185 27.217 16 27.217zm7.42-8.995c-.407-.203-2.408-1.188-2.78-1.324-.373-.135-.644-.203-.915.204-.271.407-1.05 1.323-1.288 1.595-.237.271-.475.305-.882.102-.407-.204-1.718-.633-3.272-2.02-1.21-1.078-2.026-2.41-2.264-2.817-.237-.407-.025-.627.178-.83.183-.183.407-.475.61-.712.204-.237.272-.407.408-.678.135-.271.068-.509-.034-.712-.102-.204-.916-2.205-1.255-3.02-.33-.794-.666-.686-.915-.698l-.78-.014c-.271 0-.712.102-1.085.509-.373.407-1.424 1.39-1.424 3.391s1.458 3.934 1.662 4.205c.203.271 2.87 4.382 6.953 6.146.971.42 1.73.67 2.321.859.976.31 1.864.266 2.566.162.783-.117 2.408-.984 2.747-1.933.34-.95.34-1.764.238-1.933-.102-.17-.373-.271-.78-.475z"/>
                      </svg>
                      <span>{tier.ctaText}</span>
                    </a>
                    <Link to={tier.proofLink} className="scope-proof-link">
                      {tier.proofLabel}
                    </Link>
                  </div>
                ) : (
                  <Link to={tier.proofLink} className="scope-proof-link-standard">
                    <span>{tier.proofLabel}</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-strip">
        <h2 className="reveal">Ready to transform your space?</h2>
        <Link to="/contact" className="btn-outline-white reveal reveal-delay-1">Start a Project</Link>
      </section>
    </div>
  );
}
