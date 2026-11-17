import { useState } from 'react';

/**
 * CommercialWalkthrough — Interactive Zone-Based Commercial Workspace Explorer
 * 
 * Allows corporate clients and visitors to explore commercial office interior zones:
 * Executive Boardroom, Open Workstations, Private Cabins, Reception Foyer, Acoustic Pods, and Conference Suites.
 */
export default function CommercialWalkthrough({ project }) {
  const zones = project.commercialZones || [];
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const activeZone = zones[activeZoneIndex] || zones[0];

  if (!zones.length) return null;

  return (
    <div className="commercial-walkthrough-container">
      {/* Walkthrough Header */}
      <div className="commercial-header">
        <div className="commercial-title-block">
          <span className="commercial-badge">INTERACTIVE SPATIAL EXPLORATION</span>
          <h3 className="commercial-title">Corporate Workspace Zones</h3>
          <p className="commercial-subtitle">
            Explore the multi-functional commercial interior layout — select any workspace zone below to inspect architectural details, materials, and acoustic design.
          </p>
        </div>
      </div>

      {/* Zone Selector Pills */}
      <div className="commercial-zone-pills">
        {zones.map((zone, idx) => {
          const isActive = idx === activeZoneIndex;
          return (
            <button
              key={zone.id || idx}
              type="button"
              className={`zone-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveZoneIndex(idx)}
            >
              <span className="zone-pill-number">0{idx + 1}</span>
              <span className="zone-pill-label">{zone.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="commercial-stage">
        <div className="commercial-view-card">
          <div className="commercial-image-wrap">
            <img 
              src={activeZone.image} 
              alt={activeZone.name}
              className="commercial-stage-img"
            />
            <div className="commercial-image-overlay">
              <span className="zone-indicator">ZONE 0{activeZoneIndex + 1} OF 0{zones.length}</span>
              <h4 className="zone-overlay-title">{activeZone.name}</h4>
            </div>
          </div>

          <div className="commercial-details-drawer">
            <div className="drawer-meta-header">
              <span className="drawer-zone-tag">{activeZone.tag || 'Workplace Architecture'}</span>
              <span className="drawer-zone-capacity">{activeZone.capacity || 'Executive Capacity'}</span>
            </div>
            <h4 className="drawer-zone-title">{activeZone.title || activeZone.name}</h4>
            <p className="drawer-zone-desc">{activeZone.desc}</p>
            
            {activeZone.features && (
              <div className="drawer-features-list">
                {activeZone.features.map((feat, fIdx) => (
                  <div key={fIdx} className="drawer-feature-item">
                    <span className="feature-dot">✦</span>
                    <span className="feature-text">{feat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
