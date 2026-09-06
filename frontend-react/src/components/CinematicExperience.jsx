import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicExperience({ children }) {
  const [entered, setEntered] = useState(false);
  const container = useRef();
  const videoRef = useRef();
  const audioRef = useRef();

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play();
      gsap.to(audioRef.current, { volume: 1, duration: 2 });
    }
  };

  useEffect(() => {
    const originalBg = document.body.style.background;
    document.body.style.background = 'transparent';
    return () => {
      document.body.style.background = originalBg;
    };
  }, []);

  useGSAP(() => {
    if (!entered) return;

    // Cinematic scroll-jacking logic
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cinematic-track',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Example: Dim video as you scroll down
    tl.to('.cinematic-video', { opacity: 0.3, filter: 'blur(10px)' }, 0);

  }, { scope: container, dependencies: [entered] });

  return (
    <div ref={container} className="cinematic-wrapper">
      {/* Audio Element */}
      <audio ref={audioRef} loop src="/hero-audio.mp3" />

      {/* Enter Overlay */}
      {!entered && (
        <div className="enter-overlay">
          <div className="enter-content">
            <h2>Crayola Design Studio</h2>
            <p>An immersive architectural experience.</p>
            <button onClick={handleEnter} className="btn-enter">
              Enter Experience
            </button>
            <p className="enter-note">Please enable sound for the full presentation.</p>
          </div>
        </div>
      )}

      {/* Persistent Background */}
      <div className="cinematic-bg">
        <div 
          className="cinematic-video" 
          style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        ></div>
        <div className="cinematic-overlay"></div>
      </div>

      {/* Scrollable Content Track */}
      {entered && (
        <div className="cinematic-track">
          {children}
        </div>
      )}
    </div>
  );
}
