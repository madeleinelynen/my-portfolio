import React, { useState, useEffect } from 'react';
import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Flamecoach/FC_Title_Text.png';
import extinguisherCollection from '../assets/images/Flamecoach/FC_Extinguisher.jpg';

function FlamecoachPage() {
    const hardware = [
    'Inhouse entwickelter Feuerlöscher Controller',
    'Windows Laptop',
    'VR-Brille mit Outside-in Tracking (Valve Index, ab 2023 Pimax Crystal)',
    'Multisensorische Integration (Duft, Hitze), schaltbar über LAN-Steckdosen',
    'Hand-Tracking-Technologie (Leap, Ultraleap)',
    'CodeMeter Lizenzstick',
    ];
  
    const software = [
    'Unity Engine 2019.4',
    'Visual Studio (C#)',
    'CodeMeter License Editor',
    'Wibu',
    'Leap Motion Software / Ultraleap',
    ];
  
    // const [code1, setCode1] = useState('');
    // const [code2, setCode2] = useState('');
  
    // useEffect(() => {
    //   fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/Extinguisher/ExtinguisherInputManager.cs')
    //     .then(res => res.text())
    //     .then(setCode1)
    //     .catch(err => console.error('Fehler beim Laden von code1:', err));
  
    //   fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/ExtinguisherTrackerIdManager.cs')
    //     .then(res => res.text())
    //     .then(setCode2)
    //     .catch(err => console.error('Fehler beim Laden von code2:', err));
    // }, []);

  return (
    <>
    <ProjectPage
      title="VR-Simulation zur Brandbekämpfung in verschiedenen Szenarien"
      image={titleImage}
      description="Ein realer Feuerlöscher wird mit firmeneigener Hardware und Trackern ausgestattet, 
      sodass er in der virtuellen Umgebung ebenso sichtbar und steuerbar ist wie in der realen Welt. 
      Das System wurde bereits an mehr als 30 Kunden verkauft, darunter BMW, Daimler, Securitas und Commerzbank."
      infoTexts={["10", "2019 - heute", "Unity Engine", "Programmierung, UX/UI, Animationen"]}
    />

        <div style={{ display: 'flex', gap: '2rem', marginTop: '5rem', alignItems: 'center' }}>
            <img
              src={extinguisherCollection}
              alt="Zusätzliches Bild"
              style={{ width: '45%', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div style={{
            backgroundColor: '#2a2a2a',
            textAlign: 'left',
            border: '1px solid white',
            borderRadius: '12px',
            padding: '1.5rem',
            color: 'white',             
            fontFamily: "'Montserrat', sans-serif",
            flex: 1,
            }}>
    
          <div>
            <h4>Verwendete Hardware:</h4>
              <ul>{hardware.map((item, i) => <li key={i}>{item}</li>)}</ul>
    
          <h4>Verwendete Software:</h4>
            <ul>{software.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
     </div>  
        </div>   
    
    
    </> 
  );
}

export default FlamecoachPage;
