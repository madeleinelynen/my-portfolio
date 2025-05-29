import React, { useState, useEffect } from 'react';
import ProjectPage from '../components/ProjectPage';
import exampleImage from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_2025-05-24_14-25-16.png';
import titleImage from '../assets/images/Flamecoach2/FC2_Title.png';
import CodeToggler from '../components/CodeToggler';

function Flamecoach2Page() {
  const hardware = [
  'Windows Laptop',
  'VR-Brille mit Outside-in Tracking (Valve Index, ab 2023 Pimax Crystal)',
  'Multisensorische Integration (Duft, Hitze), schaltbar über LAN-Steckdosen',
  'Hand-Tracking-Technologie (Leap, Ultraleap)',
  'CodeMeter Lizenzstick',
  ];

  const software = [
  'Unity Engine',
  'Visual Studio (C#)',
  'CodeMeter License Editor',
  'Wibu',
  'Leap Motion Software / Ultraleap',
  ];

  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/Extinguisher/ExtinguisherInputManager.cs')
      .then(res => res.text())
      .then(setCode1)
      .catch(err => console.error('Fehler beim Laden von code1:', err));

    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/ExtinguisherTrackerIdManager.cs')
      .then(res => res.text())
      .then(setCode2)
      .catch(err => console.error('Fehler beim Laden von code2:', err));
  }, []);
  
  return (
    <>
    <ProjectPage
      title="Erweiterte VR-Simulation zur Brandbekämpfung in verschiedenen Szenarien"
      image={titleImage}
      description="Ein erweitertes Projekt von Flamecoach2, das einige Verbesserungen und neue Features beinhaltet.
      Unter anderem können mehrere Feuerlöccher gleichzeitig benutzt werden, das Feuersystem wurde überarbeitet etc. "
      // projectPeriod="2023 - heute"
    />

    <div style={{ display: 'flex', gap: '2rem', marginTop: '5rem', alignItems: 'center' }}>
        <img
          src={exampleImage}
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
          <div style={{ maxWidth: '1000px', margin: '2rem auto', fontFamily: "'Montserrat', sans-serif", }}>
          <h3 style={{fontSize: '40px'}}>User Interface</h3>
          <p>Der Code zur Sammlung und Verwaltung von empfangenen Tracker Ids:</p>
          {code2 && <CodeToggler code={code2} />} 
    
    </div>   
    
    
    </>   
  );
}

export default Flamecoach2Page;
