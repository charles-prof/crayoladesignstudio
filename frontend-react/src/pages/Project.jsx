import { useParams, Navigate, Link } from 'react-router-dom';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';
import content from '../../site_content.json';

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const { slug } = useParams();
  const container = useRef();
  
  const projectIndex = projects.findIndex(p => p.id === slug);
  if (projectIndex === -1) {
    return <Navigate to="/portfolio" />;
  }
  
  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

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
        <img src={project.thumbnail} alt={project.title} />
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
            <p className="reveal">{content.projectPlaceholder}</p>
            <p className="reveal reveal-delay-1">
              Every detail was considered — from the initial sketches to the final material selection. We focused on creating a seamless flow that enhances both the aesthetic and functional aspects of the environment.
            </p>
          </div>
        </div>
      </section>

      {/* Project Images */}
      <div className="container project-images" style={{ marginBottom: '8rem' }}>
        {project.images.slice(1).map((imgUrl, idx) => (
          <img 
            key={idx} 
            className={idx % 3 === 0 ? 'full reveal' : 'half reveal'} 
            src={imgUrl} 
            alt={`${project.title} image ${idx + 1}`} 
          />
        ))}
      </div>

      {/* Next Project */}
      <Link to={`/project/${nextProject.id}`} className="next-project">
        <div>
          <p className="next-label">Next Project</p>
          <h3>{nextProject.title}</h3>
        </div>
        <span className="arrow">→</span>
      </Link>
    </div>
  );
}
