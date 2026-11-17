import { useState, useRef } from 'react';

const TOURS = [
  {
    id: 'villa2',
    name: 'Villa 02 — 3D Virtual Tour',
    badge: 'Self-Hosted 360°',
    url: '/tour/villa2/index.html',
    desc: 'High-definition 44-scene architectural walkthrough with interactive dollhouse and room transitions',
  },
  {
    id: 'full-tour',
    name: 'Complete Tour (44 Rooms)',
    badge: 'Cloud Mirror',
    url: 'https://strong-dodol-2aa1be.netlify.app/',
    desc: 'Full estate walkthrough featuring all interior and exterior living areas',
  },
];

export default function PanoramaViewer() {
  const [activeTour, setActiveTour] = useState(TOURS[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('Fullscreen request error:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error('Exit fullscreen error:', err);
      });
    }
  };

  return (
    <section className="pano-section" id="virtual-tour">
      <div className="container">
        <p className="section-eyebrow" style={{ marginBottom: '1rem', textAlign: 'center' }}>
          Interactive 360° Walkthrough
        </p>
        <h2 className="pano-heading">Experience the Space</h2>
        <p className="pano-subtext">
          Drag to look around in full 360°. Tap floor markers to walk between rooms, or open full screen for a completely immersive virtual walkthrough.
        </p>

        {/* Tour Selector Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '1.75rem',
          flexWrap: 'wrap',
        }}>
          {TOURS.map((t) => {
            const isActive = t.id === activeTour.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  if (t.id !== activeTour.id) {
                    setIsLoading(true);
                    setActiveTour(t);
                  }
                }}
                style={{
                  padding: '0.65rem 1.4rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: isActive ? '1px solid #c5a059' : '1px solid rgba(255, 255, 255, 0.15)',
                  background: isActive ? 'rgba(197, 160, 89, 0.15)' : 'rgba(15, 15, 15, 0.6)',
                  color: isActive ? '#c5a059' : 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{t.name}</span>
                <span style={{
                  fontSize: '0.6rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '2px',
                  background: isActive ? '#c5a059' : 'rgba(255, 255, 255, 0.1)',
                  color: isActive ? '#000' : '#aaa',
                  fontWeight: 700,
                }}>
                  {t.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tour Viewport */}
      <div
        ref={containerRef}
        className="pano-viewer-wrapper"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          background: '#0a0a0a',
          border: '1px solid rgba(197, 160, 89, 0.25)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
          borderRadius: isFullscreen ? '0px' : '8px',
          overflow: 'hidden',
        }}
      >
        {/* Top Control Bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1.25rem',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}>
          <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 10px #22c55e',
            }} />
            <span style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#fff',
            }}>
              {activeTour.name}
            </span>
          </div>

          <div style={{ pointerEvents: 'auto', display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={toggleFullscreen}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
              title="Toggle Fullscreen"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </button>

            <a
              href={activeTour.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                color: '#c5a059',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
              title="Open Tour in New Tab"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Pop Out</span>
            </a>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            background: '#0d0d0d',
            zIndex: 4,
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '2px solid rgba(197, 160, 89, 0.2)',
              borderTopColor: '#c5a059',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.7)',
            }}>
              Loading 360° Virtual Environment...
            </p>
          </div>
        )}

        {/* Embedded Virtual Tour */}
        <iframe
          key={activeTour.id}
          src={activeTour.url}
          title={activeTour.name}
          onLoad={() => setIsLoading(false)}
          allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
          loading="lazy"
          style={{
            width: '100%',
            height: isFullscreen ? '100vh' : '72vh',
            minHeight: isFullscreen ? '100vh' : '480px',
            border: 'none',
            display: 'block',
            background: '#000',
          }}
        />

        {/* Bottom Mobile Gesture Hint */}
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.35rem 0.9rem',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(6px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          pointerEvents: 'none',
          zIndex: 3,
        }}>
          <span style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.1em',
            color: 'rgba(255, 255, 255, 0.75)',
            textTransform: 'uppercase',
          }}>
            Drag to pan • Tap floor markers to step inside
          </span>
        </div>
      </div>
    </section>
  );
}
