import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicExperience({ children }) {
  const container = useRef();
  const videoRef = useRef();
  const audioRef = useRef();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);

  // Toggle ambient audio
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      gsap.to(audioRef.current, {
        volume: 0,
        duration: 0.8,
        onComplete: () => {
          audioRef.current.pause();
          setIsPlayingAudio(false);
        }
      });
    } else {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
        gsap.to(audioRef.current, { volume: 0.7, duration: 1.2 });
      }).catch(err => {
        console.warn('Audio play error:', err);
      });
    }
  };

  // Pause ambient audio when opening full tour modal
  useEffect(() => {
    if (showFullModal && audioRef.current && isPlayingAudio) {
      audioRef.current.pause();
    } else if (!showFullModal && audioRef.current && isPlayingAudio) {
      audioRef.current.play().catch(() => {});
    }
  }, [showFullModal]);

  useGSAP(() => {
    // Cinematic scroll dimmer
    gsap.to('.cinematic-video-element', {
      scrollTrigger: {
        trigger: '.cinematic-track',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      },
      opacity: 0.25,
      filter: 'blur(8px)',
      scale: 1.05
    });
  }, { scope: container });

  return (
    <div ref={container} className="cinematic-wrapper">
      {/* Background Ambient Audio */}
      <audio ref={audioRef} loop src="/hero-audio.mp3" preload="auto" />

      {/* Background Video Reel */}
      <div className="cinematic-bg">
        <video
          ref={videoRef}
          className="cinematic-video-element"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          poster="/projects/real/grand-villa-elevation-front.jpg"
        >
          <source src="/hero-reel.mp4" type="video/mp4" />
        </video>
        <div className="cinematic-overlay" />
      </div>

      {/* Floating Control Hub */}
      <div className="cinematic-controls">
        <button
          onClick={toggleAudio}
          className={`control-pill ${isPlayingAudio ? 'active' : ''}`}
          title="Toggle ambient architectural sound"
          aria-label={isPlayingAudio ? 'Mute ambient sound' : 'Play ambient sound'}
        >
          <span className="eq-icon">
            <span className={`bar ${isPlayingAudio ? 'animating' : ''}`}></span>
            <span className={`bar ${isPlayingAudio ? 'animating' : ''}`}></span>
            <span className={`bar ${isPlayingAudio ? 'animating' : ''}`}></span>
          </span>
          <span className="pill-text">SOUND {isPlayingAudio ? 'ON' : 'OFF'}</span>
        </button>

        <button
          onClick={() => setShowFullModal(true)}
          className="control-pill tour-pill"
          title="Watch full 3D architectural walkthrough"
          aria-label="Watch full 3D architectural walkthrough"
        >
          <span className="play-icon">▶</span>
          <span className="pill-text pill-text-desktop">WATCH FULL 3D TOUR</span>
          <span className="pill-text pill-text-mobile">3D TOUR</span>
        </button>
      </div>

      {/* Full 3D Walkthrough Modal */}
      {showFullModal && (
        <div className="tour-modal-backdrop" onClick={() => setShowFullModal(false)}>
          <div className="tour-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="tour-modal-header">
              <div className="tour-modal-title">
                <span className="modal-label">CRAYOLA DESIGN STUDIO</span>
                <h3>Official 3D Architectural Walkthrough</h3>
              </div>
              <button
                className="btn-close-modal"
                onClick={() => setShowFullModal(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="tour-modal-body">
              <video
                controls
                autoPlay
                playsInline
                webkit-playsinline="true"
                className="full-tour-video"
                src="/full-walkthrough.mp4"
                poster="/projects/real/foyer-louvered-door.jpg"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="tour-modal-footer">
              <p>Interior Design · Exterior Architecture · Photorealistic ArchViz across Bangalore, Trichy, Hyderabad & Coimbatore</p>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Content Track */}
      <div className="cinematic-track">
        {children}
      </div>
    </div>
  );
}
