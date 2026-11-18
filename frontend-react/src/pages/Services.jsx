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
            src="/projects/real/master-suite-acoustic-slats.jpg" 
            alt="Interior Design" 
            style={{ objectPosition: 'center 75%' }} 
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
            src="/projects/real/chennai-residence-elevation.jpg" 
            alt="Exterior Design" 
            style={{ objectPosition: 'center 42%' }} 
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

      <section className="cta-strip">
        <h2 className="reveal">Ready to transform your space?</h2>
        <Link to="/contact" className="btn-outline-white reveal reveal-delay-1">Start a Project</Link>
      </section>
    </div>
  );
}
