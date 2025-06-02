import 'typeface-montserrat';
import iconGroup from '../assets/images/Icons/GroupIcon.png';
import iconClock from '../assets/images/Icons/ClockIcon.png';
import iconEngine from '../assets/images/Icons/EngineSelectIcon.png';
import FadingImage from './FadingImage';

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

  const icons = [iconGroup, iconClock, iconEngine];

const titleTextStyle = {
  fontSize: '3rem',
  lineHeight: '1.6',
  fontWeight: 300,
  color: 'white',
  fontFamily: "'Montserrat', sans-serif",
  textAlign: 'center',
  marginTop: '0rem',   // oder z. B. '0rem' für ganz nah
  marginBottom: '0rem'   // kein zusätzlicher Abstand nach unten
};

  const baseTextStyle = {
  fontSize: '1rem',
  lineHeight: '1.6',
  fontWeight: 300,
  color: 'white',
  fontFamily: "'Montserrat', sans-serif",
  textAlign: 'center'
};

  return (
    // <div style={{ margin: '0 auto', marginBottom: '0rem' }}>
    //   {image && (
    //     <img
    //       src={image}
    //       alt={imageAlt}
    //       style={{ width: '100%', height: 'auto', borderRadius: '0px' }}
    //     />
    //   )}

      <div style={{ margin: '0 auto', marginBottom: '0rem' }}>
    {image && (
      <FadingImage
        src={image}
        alt={imageAlt}
        fadeHeight="10%" // Optional: z. B. "80px"
        backgroundColor="#2a2a2a" // Hintergrundfarbe deiner Seite
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
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src={icons[i]} alt={`Icon ${i}`} style={{ height: '40px' }} />
              <span style={{baseTextStyle}}>{text}</span>
            </div>
          ))}
        </div>
      )}       


      <div style={{ maxWidth: '1000px', margin: '0 auto 0 auto' }}>
        <p style={titleTextStyle}>{title}</p>
        <p style={baseTextStyle}>{description}</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0rem auto 0 auto', marginBottom: '0.5rem',fontSize: '1rem',
  lineHeight: '1.6',
  fontWeight: 600,
  color: 'white',
  fontFamily: "'Montserrat', sans-serif",
  textAlign: 'center' }}>
        <p>Meine Beteiliung in diesem Projekt</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0rem auto 0 auto', marginBottom: '3rem' }}>
        <p style={baseTextStyle}>{role}</p>
      </div>

      {(hardware.length > 0 || software.length > 0) && sideImage && (
      <div style={{
        display: 'flex',
        gap: '2rem',
        width: '100vw',
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
            width: '45vw',
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
