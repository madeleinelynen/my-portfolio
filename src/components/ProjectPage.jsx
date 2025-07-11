import { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import ImageCarousel from '../components/ImageCarousel';
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
const secondScreenRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("project-bg-dark");

    return () => document.body.classList.remove("project-bg-dark");
  }, []);

  return (
  <>
  <div className="project-page">
      <Link to="/" className="project-home-link"> Home </Link>

<div className="project-page-container">
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
        onClick={() => {
          secondScreenRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {title}
      </h1>
      </div>
    </div>
  </div>

<section className="second-screen" ref={secondScreenRef}>
  <div className="content-wrapper">
    <div className="top-left">
      <div className="description">
        {description}
      </div>

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

    <div className="top-right">
      {sideImage && (
        <img src={sideImage} alt="Side visual" className="side-image" />
      )}
    </div>

{(hardware.length > 0 || software.length > 0) && (
  <div className="bottom-row card-tech-specs">
    {hardware.length > 0 && (
      <div className="spec-column">
        <h4>Hardware</h4>
        <ul>
          {hardware.map((item, i) => (
            <li key={`hw-${i}`}>{item}</li>
          ))}
        </ul>
      </div>
    )}

    {software.length > 0 && (
      <div className="spec-column">
        <h4>Software</h4>
        <ul>
          {software.map((item, i) => (
            <li key={`sw-${i}`}>{item}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}

      </div>
</section>
</div>
</div>
<ScrollToTopButton scrollTriggerFactor={0.9} />
</>
  );
}

export default ProjectPage;
