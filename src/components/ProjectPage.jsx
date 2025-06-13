import { useEffect } from 'react';
import iconGroup from '../assets/images/Icons/GroupIcon_black.png';
import iconClock from '../assets/images/Icons/ClockIcon_black.png';
import iconEngine from '../assets/images/Icons/UnityIcon_black.png';
import FadingImage from './FadingImage';
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
  sideImage = null}) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const icons = [iconGroup, iconClock, iconEngine];
  

  return (
    <div className="project-page-container">
          <h1 className="title-label">{title}</h1>

    {image && (
      <FadingImage
        src={image}
        alt={imageAlt}
        fadeHeight="10%"
        backgroundColor="#f3eae3"
      />
    )}

      {infoTexts.length === 3 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          alignItems: 'center',
          marginTop: '3rem',
          marginBottom: '3rem'
        }}>
          {infoTexts.map((text, i) => (
            <div key={i} style={{color:'black', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src={icons[i]} alt={`Icon ${i}`} style={{ color:'black',height: '40px' }} />
              <span className="description">{text}</span>
            </div>
          ))}
        </div>
      )}       


      <div style={{ maxWidth: '1000px', margin: '0 auto 0 auto' }}>
          
          <p className="description">{description}</p>
      </div>

      <div style={{ 
        maxWidth: '1000px', 
        margin: '0rem auto 0 auto', 
        marginBottom: '0.5rem',
        fontSize: '1rem',
        lineHeight: '1.6',
        fontWeight: 600,
        color: 'white',
        fontFamily: "'Montserrat', sans-serif",
        textAlign: 'center' }}>

        <p className="description">Meine Beteiliung in diesem Projekt</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0rem auto 0 auto', marginBottom: '3rem' }}>
        <p className="description">{role}</p>
      </div>

      {(hardware.length > 0 || software.length > 0) && sideImage && (
      <div style={{
        display: 'flex',
        gap: '2rem',
        width: '100%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        alignItems: 'stretch'
      }}>
        <img
          src={sideImage}
          alt="HardwareVisual"
          style={{
            width: '45%',
            borderRadius: '8px',
            objectFit: 'cover',
            height: 'auto',
            display: 'block'
          }}
        />
      <div style={{
        flex: 1,
        backgroundColor: '#2a2a2a',
        border: '1px solid #888',
        borderRadius: '12px',
        padding: '1.5rem 2rem 1.5rem 1rem',
        color: 'white',
        fontFamily: "'Montserrat', sans-serif",
        boxSizing: 'border-box',
        minWidth: 0,
        textAlign: 'left',
        fontSize: '1rem',
        lineHeight: '1.6'
      }}>
  {hardware.length > 0 && (
    <>
      <h4 style={{ marginBottom: '0.5rem' }}>Verwendete Hardware:</h4>
      <ul style={{
        listStylePosition: 'outside',
        paddingLeft: '1.2em',
        margin: 0
      }}>
        {hardware.map((item, i) => (
          <li key={`hw-${i}`} style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            {item}
          </li>
        ))}
      </ul>
    </>
  )}
  {software.length > 0 && (
    <>
      <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Verwendete Software:</h4>
      <ul style={{
        listStylePosition: 'outside',
        paddingLeft: '1.2em',
        margin: 0
      }}>
        {software.map((item, i) => (
          <li key={`sw-${i}`} style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            {item}
          </li>
        ))}
      </ul>
    </>
  )}
</div>
</div>

)}
    </div>
  );
}

export default ProjectPage;
