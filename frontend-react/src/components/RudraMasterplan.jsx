import { useState, useRef } from 'react';

/**
 * RudraMasterplan — Interactive 3D Township Masterplan Explorer
 * 
 * Allows visitors to explore the 24-acre Rudra township masterplan.
 * Clicking spatial pins reveals curated photorealistic renders in a 
 * non-intrusive side drawer (keeping the master layout in context).
 */
export default function RudraMasterplan({ project }) {
  const [selectedPin, setSelectedPin] = useState(project.masterplanPins?.[0] || null);
  const [showPins, setShowPins] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const mapContainerRef = useRef(null);

  const pins = project.masterplanPins || [];
  const currentMap = project.masterLayout3D || project.thumbnail;

  // Helper to switch selected pin and reset any multi-image index
  const handleSelectPin = (pin) => {
    setSelectedPin(pin);
    setActiveImageIndex(0);
  };

  // Cycle to previous / next pin
  const handleNavigatePin = (direction) => {
    if (!selectedPin) return;
    const currentIndex = pins.findIndex((p) => p.id === selectedPin.id);
    const nextIndex = direction === 'next'
      ? (currentIndex + 1) % pins.length
      : (currentIndex - 1 + pins.length) % pins.length;
    handleSelectPin(pins[nextIndex]);
  };

  // Get current active render for the selected pin
  const activeImage = selectedPin?.gallery 
    ? selectedPin.gallery[activeImageIndex] 
    : (selectedPin?.image || project.thumbnail);

  return (
    <div className="rudra-masterplan-container">
      {/* Viewport Control Bar */}
      <div className="masterplan-header">
        <div className="masterplan-title-block">
          <span className="masterplan-badge">Curated 8K Architectural Renders</span>
          <h3 className="masterplan-title">24-Acre Township Exploration</h3>
          <p className="masterplan-subtitle">
            Click any pin on the master layout or select a zone below to inspect ground-level architectural renders.
          </p>
        </div>

        {/* View Mode Toggle (Interactive Pins vs Clean Aerial View) */}
        <div className="masterplan-view-toggles">
          <button
            type="button"
            className={`view-toggle-btn ${showPins ? 'active' : ''}`}
            onClick={() => setShowPins(true)}
          >
            ● Interactive Pins
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${!showPins ? 'active' : ''}`}
            onClick={() => setShowPins(false)}
          >
            Clean Aerial View
          </button>
        </div>
      </div>

      {/* Main Interactive Map & Side Drawer Split */}
      <div className="masterplan-canvas-wrapper" ref={mapContainerRef}>
        {/* Map Canvas with Interactive Pins */}
        <div className="masterplan-canvas">
          <img
            src={currentMap}
            alt="Rudra 3D Master Layout Aerial"
            className="masterplan-base-img"
          />

          {/* Interactive Spatial Pins (Rendered when showPins is true) */}
          {showPins && pins.map((pin, idx) => {
            const isSelected = selectedPin?.id === pin.id;
            return (
              <button
                key={pin.id}
                type="button"
                className={`spatial-pin ${isSelected ? 'active' : ''}`}
                style={{
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                }}
                onClick={() => handleSelectPin(pin)}
                aria-label={`Zone ${idx + 1}: ${pin.name}`}
              >
                <span className="pin-pulse-ring" />
                <span className="pin-core">
                  <span className="pin-num">{idx + 1}</span>
                </span>

                {/* Hover Tooltip */}
                <span className="pin-tooltip">
                  <span className="pin-tooltip-cat">{pin.category}</span>
                  <span className="pin-tooltip-name">{pin.name}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Context-Aware Side Drawer / Split Card */}
        {selectedPin && (
          <aside className="masterplan-drawer">
            {/* Drawer Header */}
            <div className="drawer-header">
              <div className="drawer-meta">
                <span className="drawer-zone-tag">{selectedPin.category}</span>
                <h4 className="drawer-zone-title">{selectedPin.name}</h4>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setSelectedPin(null)}
                aria-label="Close Zone Details"
              >
                ✕
              </button>
            </div>

            {/* Selected Zone Primary Render */}
            <div className="drawer-visual-frame" onClick={() => setIsLightboxOpen(true)}>
              <img
                src={activeImage}
                alt={selectedPin.name}
                className="drawer-main-img"
              />
              <button type="button" className="drawer-expand-pill">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                <span>Expand Fullscreen</span>
              </button>
            </div>

            {/* Multi-angle Mini Carousel (e.g. for multiple street views) */}
            {selectedPin.gallery && selectedPin.gallery.length > 1 && (
              <div className="drawer-mini-gallery">
                {selectedPin.gallery.map((imgUrl, gIdx) => (
                  <button
                    key={gIdx}
                    type="button"
                    className={`mini-thumb-btn ${activeImageIndex === gIdx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(gIdx)}
                  >
                    <img src={imgUrl} alt={`Street View ${gIdx + 1}`} />
                    <span className="mini-thumb-label">View 0{gIdx + 1}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Zone Description */}
            <p className="drawer-description">{selectedPin.desc}</p>

            {/* Zone Sequential Navigation Footer */}
            <div className="drawer-nav-footer">
              <button
                type="button"
                className="drawer-nav-btn"
                onClick={() => handleNavigatePin('prev')}
              >
                ← Prev Zone
              </button>
              <span className="drawer-zone-counter">
                {pins.findIndex((p) => p.id === selectedPin.id) + 1} / {pins.length}
              </span>
              <button
                type="button"
                className="drawer-nav-btn"
                onClick={() => handleNavigatePin('next')}
              >
                Next Zone →
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* Quick Zone Navigation Pills */}
      <div className="masterplan-zone-pills-bar">
        <span className="zone-bar-label">Explore Zones:</span>
        <div className="zone-pills-scroll">
          {pins.map((pin, idx) => {
            const isSelected = selectedPin?.id === pin.id;
            return (
              <button
                key={pin.id}
                type="button"
                className={`zone-pill ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelectPin(pin)}
              >
                <span className="zone-pill-num">0{idx + 1}</span>
                <span className="zone-pill-name">{pin.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="masterplan-lightbox" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage} alt={selectedPin?.name} className="lightbox-img" />
            <div className="lightbox-caption">
              <div>
                <span className="lightbox-cat">{selectedPin?.category}</span>
                <h3 className="lightbox-title">{selectedPin?.name}</h3>
              </div>
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
