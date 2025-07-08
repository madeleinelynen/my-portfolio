import { useState, useEffect } from 'react';
import CodeToggler from '../components/CodeToggler';
import FullWidthImage from '../components/FullWidthImage';
import ProjectPage from '../components/ProjectPage';
import TwoImageRow from '../components/TwoImageRow';
import ImageCarousel from '../components/ImageCarousel';
import './Flamecoach2Page.css';

import titleImage from '../assets/images/Flamecoach2/Banner.jpg';
import sideImage from '../assets/images/Flamecoach2/F2_modells.png';

import img1 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Cal_AWG.png';
import img2 from '../assets/images/Flamecoach2/Flamecoach2HoveringTile.png';
import img3 from '../assets/images/Flamecoach2/Flamecoach2HoveringTile.png';
import img4 from '../assets/images/Flamecoach2/AwgInspector.png';

import imgUI_cal from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Cal_AWG.png';
import imgUI_tracker from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Tracker_2.png';
import imgUI_Scenes from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Scenes.png';
import imgUI_Pl_01 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.1.png';
import imgUI_Pl_02 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.2.png';
import imgUI_Pl_03 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.3.png';
import imgUI_Pl_04 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.4.png';

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
    'Steam VR',
    'Unity Engine 2023.2',
    'Visual Studio (C#)', 
    'CodeMeter License Editor',
    'Wibu',
    'Ultraleap',
  ];

  const [setInput1] = useState('');
  const [tracker1, setTracker2] = useState('');
  const [awg1, setAwg1] = useState('');
  const [awg2, setAwg2] = useState('');

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/Extinguisher/ExtinguisherInputManager.cs')
      .then(res => res.text())
      .then(setInput1)
      .catch(err => console.error('Error loading ExtinguisherInputManager', err));

    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/ExtinguisherTrackerIdManager.cs')
      .then(res => res.text())
      .then(setTracker2)
      .catch(err => console.error('Error loading ExtinguisherTrackerIdManager', err));

    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/Extinguisher/AWG/AWGNozzleInputManager.cs')
      .then(res => res.text())
      .then(setAwg1)
      .catch(err => console.error('Error loading AWGNozzleInputManager', err));

    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/Extinguisher/AWG/AWGNozzleInputVisuals.cs')
      .then(res => res.text())
      .then(setAwg2)
      .catch(err => console.error('Error loading AWGNozzleInputVisuals', err));
  }, []);

  return (
    <div className="page-container">
      <ProjectPage
        title="Flamecoach 2"
        image={titleImage}
        description="Erweiterte VR-Brandbekämpfungssimulation mit neuen Funktionen und realitätsnahen Szenarien.
        Basierend auf dem Projekt Flamecoach bietet diese erweiterte Simulation eine realistische Trainingsumgebung 
        zur Brandbekämpfung. Zu den Verbesserungen zählen ein überarbeitetes Feuersystem und User Interface, erweiterte Szenarien 
        sowie die Möglichkeit, mehrere Feuerlöscher gleichzeitig einzusetzen. Ziel ist es, das Trainingserlebnis 
        noch praxisnäher und flexibler zu gestalten."
        role={[
          "Programmierung",
          "UX/UI-Entwicklung und -Integration, Erstellung von Animationen innerhalb der Engine",
          "Integration der Löscher-Hardware (einschließlich firmeneigener Entwicklungen)",
          "Implementierung von Hand-Tracking-Interaktionen",
        ]}
        infoTexts={["9", "2023 - heute", "Unity Engine"]}
        hardware={hardware}
        software={software}
        sideImage={sideImage}
      />

      <ImageCarousel images={[ img1, img2, img3, img4]} maxWidth="1000px" />;
      <ImageCarousel images={[ imgUI_Scenes, imgUI_cal, imgUI_tracker, imgUI_Pl_02, imgUI_Pl_04,imgUI_Pl_03]} maxWidth="1000px" />;

    {/* <div className="content-section">
          
  <h2 className="section-title">Integration der Feuerlöscher-Controller</h2>
  <h3 className="section-subtitle">Integrationsbeispiel am Strahlrohr</h3>

  <div className="integration-column">
    <ul className="integration-points">
      <li>Unterstützung der drei benötigten Eingangskanäle (Hall-Sensoren)</li>
      <li>Kontrolle und Testbarkeit der Inputs im Game Mode</li>
      <li>Werte werden im Game Mode über Events weitergegeben</li>
      <li>Debug-Modus, mit dem man Inputs imitieren und Funktionen ohne Hardware testen kann</li>
      <li>Speicherung und Auslesung der Grenzwerte im JSON</li>
      <li>Modularisierung durch Vererbung von ExtinguisherInputManager&lt;T&gt;</li>
    </ul>

    {awg1 && <CodeToggler code={awg1} label="AWGNozzleInputManager.cs" />}
  </div>


        <FullWidthImage 
          src={streamnozzle} 
          alt="streamnozzle"
        />

        <h3 className="section-subtitle">Vive Tracker Management</h3>
        <p>
          Jede Feuerlöscher-Hardware braucht mindestens einen Vive Tracker, um die Bewegung digital immersiv reproduzieren zu können.
          Das folgende Script verwaltet die Zuordnung und Speicherung von Vive Tracker Seriennummern zu den virtuellen Feuerlöschern.
        </p>
        <p>
          Zusätzlich prüft es den Lizenzstatus und ob eine SteamVR-Verbindung besteht. UI und Anbindung hierfür wurden von mir konzipiert.
        </p>
        <div className="flex-center">
          <ul className="list-inside">
            <li>Automatische Erkennung von Vive Trackern</li>
            <li>Verwaltung von Seriennummern und Rollen (z. B. Düse, Löschkörper)</li>
            <li>Auslesen und Speichern mit JSON-basierter Persistenz</li>
            <li>Lizenzprüfung für Feuerlöscher-Hardware</li>
            <li>Verwaltung im internen Developer-Modus</li>
            <li>Dynamisches Zuweisen, Entfernen und Austauschen von Trackern</li>
          </ul>
        </div>
        {tracker1 && <CodeToggler code={tracker1} label="ExtinguisherTrackerIdManager.cs" />}

        <FullWidthImage 
          className="full-width-image"
          src={trackerUI} 
          alt="trackerui"
        />

        <h2 className="section-title">UX/UI</h2>
        <h3 className="section-subtitle">Playlist Feature</h3>
        <TwoImageRow 
          leftImage={playlist1}
          rightImage={playlist2}
          gap="2rem"
          altLeft="playlist1"
          altRight="playlist2"
        />

        <h3 className="section-subtitle">Scene Management</h3>
        <FullWidthImage 
          className="full-width-image"
          src={sceneUI} 
          alt="sceneui"
        />

        <h3 className="section-subtitle">Löscher Kalibrierung</h3>
        <FullWidthImage 
          className="full-width-image"
          src={streamnozzleCal} 
          alt="streamnozzlecalibration"
        />
      </div>*/}
    </div>
  );
}

export default Flamecoach2Page;
