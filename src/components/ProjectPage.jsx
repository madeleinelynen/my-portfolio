import { useEffect } from 'react';
import iconGroup from '../assets/images/Icons/GroupIcon_black.png';
import iconClock from '../assets/images/Icons/ClockIcon_black.png';
import iconEngine from '../assets/images/Icons/UnityIcon_black.png';
import './ProjectPage.css';

function ProjectPage({ 
title,
  image,
  imageAlt = 'title', 
  description,
  role = '',
  infoTexts = [],
  hardware = [],
  software = [],
  sideImage = null }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const icons = [iconGroup, iconClock, iconEngine];

  return (
<div className="project-page-container">
  {/* OBERER TEIL: horizontal angeordnet */}
<div className="hero-fullscreen">
  <img src={image} alt={imageAlt} className="hero-fullscreen-image" />
  <div className="hero-overlay">
    <div className="hero-content">
      <div className="hero-info-group">
        {infoTexts.map((text, i) => (
          <div key={i} className="hero-info-item">
            <img src={icons[i]} alt={`icon-${i}`} className="hero-icon" />
            <span>{text}</span>
          </div>
        ))}
      </div>
      <h1 className="hero-title">{title}</h1>
    </div>
  </div>
</div>


  {/* ALLES UNTEN: wieder vertikal */}
  <div className="project-content-below">
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <p className="description">{description}</p>
    </div>

    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      marginBottom: '0.5rem',
      fontSize: '1rem',
      lineHeight: '1.6',
      fontWeight: 600,
      color: 'white',
      fontFamily: "'Montserrat', sans-serif",
      textAlign: 'center'
    }}>
      <p className="description">Meine Beteiligung in diesem Projekt</p>
    </div>

    <div style={{ maxWidth: '1000px', margin: '0 auto 3rem auto' }}>
      <p className="description">{role}</p>
    </div>

    {(hardware.length > 0 || software.length > 0) && sideImage && (
      <div className="hardware-software-block">
        <img
          src={sideImage}
          alt="HardwareVisual"
          className="side-image"
        />
        <div className="tech-specs-box">
          {hardware.length > 0 && (
            <>
              <h4>Verwendete Hardware:</h4>
              <ul>
                {hardware.map((item, i) => (
                  <li key={`hw-${i}`}>{item}</li>
                ))}
              </ul>
            </>
          )}
          {software.length > 0 && (
            <>
              <h4>Verwendete Software:</h4>
              <ul>
                {software.map((item, i) => (
                  <li key={`sw-${i}`}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    )}
  </div>
</div>

  );
}

export default ProjectPage;
