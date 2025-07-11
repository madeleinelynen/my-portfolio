import { useState, useEffect } from 'react';
import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';
import './Flamecoach2Page.css';

import titleImage from '../assets/images/Flamecoach2/Banner.jpg';
import sideImage from '../assets/images/Flamecoach2/F2_modells.png';

import img1 from '../assets/images/Flamecoach2/Setup_Beispiel_01.png';
import img2 from '../assets/images/Flamecoach2/AwgInspector.png';

// #region ImageCarousel Imports
import imgUI_cal from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Cal_AWG.png';
import imgUI_tracker from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Tracker_2.png';
import imgUI_Scenes from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Scenes.png';
import imgUI_Pl_02 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.2.png';
import imgUI_Pl_03 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.3.png';
import imgUI_Pl_04 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.4.png';
// endregion

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
  const [setTracker2] = useState('');
  const [setAwg1] = useState('');
  const [setAwg2] = useState('');

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

      <ImageCarousel images={[ img1, img2]} maxWidth="1000px" />;
      <ImageCarousel images={[ imgUI_Scenes, imgUI_cal, imgUI_tracker, imgUI_Pl_02, imgUI_Pl_04,imgUI_Pl_03]} maxWidth="1000px" />;
    </div>
  );
}

export default Flamecoach2Page;
