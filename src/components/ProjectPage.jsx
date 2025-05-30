import 'typeface-montserrat';
import iconGroup from '../assets/images/Icons/GroupIcon.png';
import iconClock from '../assets/images/Icons/ClockIcon.png';
import iconEngine from '../assets/images/Icons/EngineSelectIcon.png';
import iconRole from '../assets/images/Icons/PawnIcon.png';

function ProjectPage({ 
  title, 
  image, 
  description,
  infoTexts = []}) {

  const icons = [iconGroup, iconClock, iconEngine, iconRole];

  return (
    <div style={{ margin: '0 auto', marginBottom: '1rem' }}>
      {image && (
        <img
          src={image}
          alt={title}
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        />
      )}

      <div style={{ maxWidth: '1000px', margin: '3rem auto 0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 400, color: 'white' }}>{title}</h1>
      </div>
      
      <div style={{ maxWidth: '1000px', margin: '2rem auto 0 auto' }}>
        <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{description}</p>
      </div>

      {infoTexts.length === 4 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          alignItems: 'center',
          marginTop: '3rem',
          marginBottom: '1rem'
        }}>
          {infoTexts.map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src={icons[i]} alt={`Icon ${i}`} style={{ width: '40px', height: '40px' }} />
              <span style={{ color: 'white', fontSize: '0.9rem' }}>{text}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default ProjectPage;
