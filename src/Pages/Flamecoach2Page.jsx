import React, { useState, useEffect } from 'react';
import CodeToggler from '../components/CodeToggler';
import FullWidthImage from '../components/FullWidthImage';
import ProjectPage from '../components/ProjectPage';
import TwoImageRow from '../components/TwoImageRow';
import titleImage from '../assets/images/Flamecoach2/Flamecoach2HoverTile.png';
import extinguisherCollection from '../assets/images/Flamecoach2/F2_modells.png';
import streamnozzle from '../assets/images/Flamecoach2/AwgInspector.png'
import streamnozzleCal from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Cal_AWG.png'
import trackerUI from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Tracker_2.png'
import sceneUI from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Scenes.png'

import playlist1 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.1.png'
import playlist2 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.2.png'

function Flamecoach2Page() {
  const hardware = [
  'Inhouse entwickelter Feuerlöscher Controller',
  'Windows Laptop',
  'VR-Brille mit Outside-in Tracking (Pimax Crystal)',
  'Multisensorische Integration (Duft, Hitze), schaltbar über LAN-Steckdosen',
  'Hand-Tracking-Technologie (Ultraleap)',
  'CodeMeter Lizenzstick',
  ];

  const software = [
  'Unity Engine 2023.2',
  'Visual Studio (C#)',
  'CodeMeter License Editor',
  'Wibu',
  'Ultraleap',
  ];

  const [input1, setInput1] = useState('');
  const [tracker1, setTracker2] = useState('');
  const [awg1, setAwg1] = useState('');
  const [awg2, setAwg2] = useState('');

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/Extinguisher/ExtinguisherInputManager.cs')
      .then(res => res.text())
      .then(setInput1)
      .catch(err => console.error('FError while loading setInput1', err));

    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/ExtinguisherTrackerIdManager.cs')
      .then(res => res.text())
      .then(setTracker2)
      .catch(err => console.error('Error while loading setTracker2:', err));

    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/Extinguisher/AWG/AWGNozzleInputManager.cs')
      .then(res => res.text())
      .then(setAwg1)
      .catch(err => console.error('Error while loading setAwg1:', err));

    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/Extinguisher/AWG/AWGNozzleInputVisuals.cs')
      .then(res => res.text())
      .then(setAwg2)
      .catch(err => console.error('Error while loading setAwg2:', err));
  }, []);
  
  return (
    <>
    <ProjectPage
    title ="Flamecoach 2"
      image={titleImage}
      description="Erweiterte VR-Simulation zur Brandbekämpfung in verschiedenen Szenarien.
      Ein erweitertes Projekt von Flamecoach2, das einige Verbesserungen und neue Features beinhaltet.
      Unter anderem können mehrere Feuerlöscher gleichzeitig benutzt werden, das Feuersystem wurde überarbeitet etc. "
      role='Programmierung, UX/UI-Entwicklung und -Integration, Erstellung von Animationen innerhalb der 
      Engine, Integration von Hardware (einschließlich firmeneigener Entwicklungen), Implementierung von 
      Hand-Tracking-Interaktionen'
      infoTexts={["9", "2023 - heute", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={extinguisherCollection}
    />
 
      <div style={{ maxWidth: '1000px', margin: '2rem auto', fontFamily: "'Montserrat', sans-serif", textAlign:'center' }}>
      <h2 style={{ fontSize: '40px', marginBottom: '0.5rem' }}>Integration der Feuerlöscher-Controller</h2>

      <h3 style={{ fontSize: '28px', color: '#888' }}>Grundsätzlicher Feuerlöscher Input</h3>
      <p>
        Diese Scripte wurden von mir geschrieben, um den Input der eigen entwickelten Feuerlöscher Hardware 
        die in Windows gesendet werden in Unity sinnvoll abzufangen. 
      </p>

      {input1 && <CodeToggler code={input1} label="ExtinguisherInputManager.cs" />}

      <div style={{ maxWidth: '1000px', margin: '2rem auto', fontFamily: "'Montserrat', sans-serif" }}>
  <h4 style={{ fontSize: '28px', color: '#888' }}>Integrationsbeispiel am Strahlrohr</h4>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', color: '#ffffff' }}>
        <ul style={{
          listStylePosition: 'inside',  
          textAlign: 'left',
          color: '#ffffff',            
          fontFamily: "'Montserrat', sans-serif",
          lineHeight: '1.8',
          fontWeight: 300,
          maxWidth: '1000px',            
          paddingLeft: '0',       
          margin: 0
        }}>
          <li>Unterstützung der drei benötigten Eingangskanäle (Hall-Sensoren)</li>
          <li>Kontrolle und Testbarkeit der Inputs im Game Mode </li>
          <li>Werte werden im Game Mode über Events weitergegeben</li>
          <li>Debus-Modus, der Inputs imitiert und Reaktionen testet</li>
          <li>Speicherung und Auslesung der Grenzwerte im JSON</li>
          <li>Modularisierung durch Vererbung von ExtinguisherInputManager&lt;T&gt;</li>
        </ul>
      </div>

  {awg1 && <CodeToggler code={awg1} label="AWGNozzleInputManager.cs" />}
  {awg2 && <CodeToggler code={awg2} label="AWGNozzleInputVisuals.cs" />}
</div>

<video
  src="/videos/awg_demo.mp4"
  autoPlay
  loop
  muted
  playsInline
  style={{
    width: '100%',
    display: 'block',
    maxWidth: '800px',
    margin: '0 auto'
  }}
/>

      <FullWidthImage 
        src={streamnozzle} 
        alt="streamnozzle"
      />

      <h3 style={{ fontSize: '28px', color: '#888' }}>Vive Tracker Management</h3>

      <p>
        Jede Feuerlöscher Hardware braucht mindestens einen Vive Tracker, um die Bewegung digital immersiv reproduzieren zu können.
        Das folgende Script von mir verwaltet die Zuordnung und Speicherung von Vive Tracker Seriennummern zu den virtuellen Feuerlöschern.
        Es erkennt neue Tracker automatisch, speichert bekannte Tracker in einer JSON-Datei und ermöglicht über
        eine Schnittstelle das Zuweisen, Entfernen und Austauschen von Trackern für verschiedene Löschgeräte.
        Zusätzlich prüft es den Lizenzstatus und ob eine SteamVR-Verbindung besteht.
      </p>
      <p>
        Zu der Aufgabe gehörte auch die Konzeption, Aufbau von UI in der Engine und Anbindung an die Funktionen.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', color: '#ffffff' }}>
        <ul style={{
          listStylePosition: 'inside',  
          textAlign: 'left',
          color: '#ffffff',            
          fontFamily: "'Montserrat', sans-serif",
          lineHeight: '1.8',
          fontWeight: 300,
          maxWidth: '1000px',            
          paddingLeft: '0',       
          margin: 0
        }}>
          <li>Automatische Erkennung von Vive Trackern</li>
          <li>Verwaltung von Seriennummern und Rollen (z. B. Düse, Löschkörper)</li>
          <li>Auslesen und Speichern mit JSON-basierter Persistenz</li>
          <li>Lizenzprüfung für Feuerlöscher-Hardware</li>
          <li>Verwaltung im internen Developer-Modus</li>
          <li>Dynamisches Zuweisung, Entfernung und Austausch von Trackern</li>
        </ul>
      </div>

      {tracker1 && <CodeToggler code={tracker1} label="ExtinguisherTrackerIdManager.cs" />}

      <FullWidthImage 
        src={trackerUI} 
        alt="trackerui"
      />

      <h2 style={{ fontSize: '40px', marginBottom: '0.5rem' }}>UX/UI</h2>
      <h2 style={{ fontSize: '28px', color: '#888' }}>Playlist Feature</h2>

      <TwoImageRow 
        leftImage={playlist1}
        rightImage={playlist2}
        gap='2rem'
        altLeft="playlist1"
        altRight='playlist2'
      />

      <h2 style={{ fontSize: '28px', color: '#888' }}>Scene Management</h2>

      <FullWidthImage 
        src={sceneUI} 
        alt="sceneui"
      />

      <h2 style={{ fontSize: '28px', color: '#888' }}>Löscher Kalibrierung</h2>

      <FullWidthImage 
        src={streamnozzleCal} 
        alt="streamnozzlecalibration"
      />

  </div>
    </>   
  );
}

export default Flamecoach2Page;
