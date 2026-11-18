import { useState, useEffect, useRef } from 'react';
import content from '../data/site_content.json';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Luxury Villa & Architecture');
  const [customNotes, setCustomNotes] = useState('');
  const [city, setCity] = useState('Bangalore');
  const widgetRef = useRef(null);

  const studioPhone = content.contact.phone || '+91 96987 53213';
  const whatsappNum = content.contact.whatsappNumber || '919698753213';

  const quickStarters = [
    { id: 'villa', label: '🏛️ Luxury Villa & Elevation', service: 'Luxury Villa & Architecture' },
    { id: 'interior', label: '🛋️ Interior Styling & Fitout', service: 'Interior Design & Styling' },
    { id: 'walkthrough', label: '🎥 4K Cinematic Walkthrough', service: '3D ArchViz & Walkthrough' },
    { id: 'vr-unreal', label: '🥽 VR & Unreal Engine Viz', service: 'Advanced VR & Unreal Engine Visualization (Phase 2)' },
    { id: 'planning', label: '📐 2D Working Drawings & Plan', service: '2D Architectural Drawings & Statutory Approvals' },
  ];

  // Close widget on outside click or Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const buildWhatsAppUrl = () => {
    const lines = [
      `*Inquiry for Crayola Design Studio*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `• *Service Required:* ${selectedService}`,
      `• *Project Location:* ${city}`,
    ];
    if (customNotes.trim()) {
      lines.push(`• *Notes / Requirements:* ${customNotes.trim()}`);
    }
    lines.push(``);
    lines.push(`Hello Crayola team, I'd like to discuss our project plans and explore how we can collaborate.`);

    const messageText = lines.join('\n');
    return `https://wa.me/${whatsappNum}?text=${encodeURIComponent(messageText)}`;
  };

  const handleStartChat = () => {
    const url = buildWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="cds-wa-container" ref={widgetRef} aria-label="WhatsApp Concierge Desk">
      {/* Expanded Concierge Flyout Card */}
      {isOpen && (
        <div className="cds-wa-card" role="dialog" aria-modal="true" aria-label="Crayola Design Studio Direct WhatsApp Chat">
          {/* Card Header */}
          <div className="cds-wa-card-header">
            <div className="cds-wa-card-brand">
              <div className="cds-wa-avatar-wrap">
                <img 
                  src="/logo.png" 
                  alt="Crayola Design Studio" 
                  className="cds-wa-avatar" 
                />
                <span className="cds-wa-status-badge" title="Active on WhatsApp" />
              </div>
              <div className="cds-wa-brand-details">
                <h4 className="cds-wa-brand-title">Crayola Design Studio</h4>
                <p className="cds-wa-brand-sub">Principal Design & 3D ArchViz Desk</p>
                <div className="cds-wa-online-tag">
                  <span className="cds-wa-pulse-indicator" />
                  <span>Online now · Bangalore · Trichy · Hyd · Cbe</span>
                </div>
              </div>
            </div>
            <button 
              type="button" 
              className="cds-wa-close-btn" 
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp chat card"
            >
              ✕
            </button>
          </div>

          {/* Card Body */}
          <div className="cds-wa-card-body">
            <div className="cds-wa-bubble">
              <p>
                Hello! 👋 Planning a luxury villa, interior transformation, or 4K ArchViz project?
              </p>
              <span className="cds-wa-time">Direct studio line: {studioPhone}</span>
            </div>

            {/* Quick Service Starters */}
            <div className="cds-wa-section-title">SELECT PROJECT TYPE:</div>
            <div className="cds-wa-chips-grid">
              {quickStarters.map((starter) => (
                <button
                  key={starter.id}
                  type="button"
                  className={`cds-wa-chip ${selectedService === starter.service ? 'active' : ''}`}
                  onClick={() => setSelectedService(starter.service)}
                >
                  {starter.label}
                </button>
              ))}
            </div>

            {/* City Selector */}
            <div className="cds-wa-form-row">
              <div className="cds-wa-field">
                <label htmlFor="cds-wa-city">PROJECT LOCATION:</label>
                <select 
                  id="cds-wa-city"
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                  className="cds-wa-select"
                >
                  <option value="Bangalore">Bangalore</option>
                  <option value="Trichy">Trichy</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Other South Indian Location">Other South Indian Location</option>
                </select>
              </div>
            </div>

            {/* Custom Notes */}
            <div className="cds-wa-field">
              <label htmlFor="cds-wa-notes">PROJECT BRIEF / DIMENSIONS (OPTIONAL):</label>
              <textarea
                id="cds-wa-notes"
                rows="2"
                placeholder="e.g. 4,500 sq.ft villa in Whitefield, looking for elevation and walkthrough..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="cds-wa-textarea"
              />
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              className="cds-wa-action-btn"
              onClick={handleStartChat}
            >
              <svg 
                className="cds-wa-svg-icon" 
                viewBox="0 0 32 32" 
                width="20" 
                height="20" 
                fill="currentColor"
              >
                <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.666.776 5.15 2.115 7.24L3 29.5l6.45-1.583A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.717c-2.31 0-4.475-.688-6.287-1.874l-.45-.296-3.83.94 1.03-3.69-.297-.473A11.168 11.168 0 0 1 4.783 16C4.783 9.815 9.815 4.783 16 4.783S27.217 9.815 27.217 16 22.185 27.217 16 27.217zm7.42-8.995c-.407-.203-2.408-1.188-2.78-1.324-.373-.135-.644-.203-.915.204-.271.407-1.05 1.323-1.288 1.595-.237.271-.475.305-.882.102-.407-.204-1.718-.633-3.272-2.02-1.21-1.078-2.026-2.41-2.264-2.817-.237-.407-.025-.627.178-.83.183-.183.407-.475.61-.712.204-.237.272-.407.408-.678.135-.271.068-.509-.034-.712-.102-.204-.916-2.205-1.255-3.02-.33-.794-.666-.686-.915-.698l-.78-.014c-.271 0-.712.102-1.085.509-.373.407-1.424 1.39-1.424 3.391s1.458 3.934 1.662 4.205c.203.271 2.87 4.382 6.953 6.146.971.42 1.73.67 2.321.859.976.31 1.864.266 2.566.162.783-.117 2.408-.984 2.747-1.933.34-.95.34-1.764.238-1.933-.102-.17-.373-.271-.78-.475z"/>
              </svg>
              <span>Connect on WhatsApp</span>
              <span className="cds-wa-btn-arrow">→</span>
            </button>
          </div>

          {/* Card Footer */}
          <div className="cds-wa-card-footer">
            <div className="cds-wa-footer-info">
              <span>Direct Studio Call:</span>
              <a href={`tel:${content.contact.phoneRaw || '+919698753213'}`} className="cds-wa-call-link">
                {studioPhone}
              </a>
            </div>
            <div className="cds-wa-footer-meta">
              <span>{content.contact.hours || 'Mon – Sat: 9 AM – 8 PM IST'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Single Unified Floating Action Button */}
      <button
        type="button"
        className={`cds-wa-unified-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close WhatsApp Concierge Desk" : "Chat with Principal Architect — Typically replies in 15 mins"}
        aria-expanded={isOpen}
      >
        <div className="cds-wa-btn-icon-wrap">
          {isOpen ? (
            <span className="cds-wa-close-icon">✕</span>
          ) : (
            <svg 
              className="cds-wa-icon-svg" 
              viewBox="0 0 32 32" 
              width="22" 
              height="22" 
              fill="currentColor"
            >
              <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.666.776 5.15 2.115 7.24L3 29.5l6.45-1.583A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.717c-2.31 0-4.475-.688-6.287-1.874l-.45-.296-3.83.94 1.03-3.69-.297-.473A11.168 11.168 0 0 1 4.783 16C4.783 9.815 9.815 4.783 16 4.783S27.217 9.815 27.217 16 22.185 27.217 16 27.217zm7.42-8.995c-.407-.203-2.408-1.188-2.78-1.324-.373-.135-.644-.203-.915.204-.271.407-1.05 1.323-1.288 1.595-.237.271-.475.305-.882.102-.407-.204-1.718-.633-3.272-2.02-1.21-1.078-2.026-2.41-2.264-2.817-.237-.407-.025-.627.178-.83.183-.183.407-.475.61-.712.204-.237.272-.407.408-.678.135-.271.068-.509-.034-.712-.102-.204-.916-2.205-1.255-3.02-.33-.794-.666-.686-.915-.698l-.78-.014c-.271 0-.712.102-1.085.509-.373.407-1.424 1.39-1.424 3.391s1.458 3.934 1.662 4.205c.203.271 2.87 4.382 6.953 6.146.971.42 1.73.67 2.321.859.976.31 1.864.266 2.566.162.783-.117 2.408-.984 2.747-1.933.34-.95.34-1.764.238-1.933-.102-.17-.373-.271-.78-.475z"/>
            </svg>
          )}
        </div>

        <div className="cds-wa-btn-content">
          {isOpen ? (
            <span className="cds-wa-btn-main">Close Concierge</span>
          ) : (
            <>
              <span className="cds-wa-btn-main">Chat with Principal Architect</span>
              <span className="cds-wa-btn-meta">
                <span className="cds-wa-live-dot" />
                <span>Typically replies in 15 mins</span>
              </span>
            </>
          )}
        </div>
      </button>
    </div>
  );
}
