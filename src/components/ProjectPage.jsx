import { useEffect } from 'react';
import { Link } from "react-router-dom";
import iconGroup from '../assets/images/Icons/GroupIcon_black.png';
import iconClock from '../assets/images/Icons/ClockIcon_black.png';
import iconEngine from '../assets/images/Icons/UnityIcon_black.png';
import './ProjectPage.css';
import ScrollToTopButton from "../components/ScrollToTopButton";

function ProjectPage({ 
title,
  image,
  imageAlt = 'title', 
  description,
  role = [],
  infoTexts = [],
  hardware = [],
  software = [],
  sideImage = null,
  websiteLink = '' }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const icons = [iconGroup, iconClock, iconEngine];

  useEffect(() => {
    document.body.classList.add("project-bg-dark");

    return () => document.body.classList.remove("project-bg-dark");
  }, []);

  return (
    <>
    <div className="project-page">
      <Link to="/" className="project-home-link">
        Home
      </Link>

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

      <h1
        className="hero-title"
        onClick={() =>
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
        }
      >
        {title}
      </h1>
      </div>
    </div>
  </div>

  {/* ---------- SECOND SCREEN ---------- */}
<section className="second-screen">
  <div className="content-wrapper">

    {/* Linke Spalte: Beschreibung */}
<div className="left-column">
  <p className="description">{description}</p>

  {websiteLink && (
    <div className="project-website-link">
      <a href={websiteLink} target="_blank" rel="noopener noreferrer">
        Zur Projektwebsite →
      </a>
    </div>
  )}

  <div className="role-section">
    <h3 className="section-heading">Meine Beteiligung</h3>
    <ul className="role-list">
      {role.map((item, i) => (
        <li key={`role-${i}`}>{item}</li>
      ))}
    </ul>
  </div>
</div>

    {/* Rechte Spalte: zwei gestapelte Karten */}
    <div className="right-column">
      {(hardware.length > 0 || software.length > 0) && (
        <div className="card card-tech-specs">
          {hardware.length > 0 && (
            <>
              <h4>Verwendete Hardware</h4>
              <ul>{hardware.map((item, i) => <li key={`hw-${i}`}>{item}</li>)}</ul>
            </>
          )}
          {software.length > 0 && (
            <>
              <h4>Verwendete Software</h4>
              <ul>{software.map((item, i) => <li key={`sw-${i}`}>{item}</li>)}</ul>
            </>
          )}
        </div>
      )}

    </div>

  </div>
</section>


</div>
</div>
<ScrollToTopButton scrollTriggerFactor={0.9} />
</>
  );
}

export default ProjectPage;
