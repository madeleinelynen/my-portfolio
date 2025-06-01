import ProjectPage from '../components/ProjectPage';
import banner from '../assets/images/Aufwind/Banner.png';
import sideImage from '../assets/images/Aufwind/Aufwind_keyvisual_Poster.jpg';

function AufwindPage() {
  const hardware = [
  'Yaw Motion Seat',
  'Varjo Aero',
  'Ultraleap',
  'Multisensorische Integration (Duft, Hitze), schaltbar über LAN-Steckdosen'
  ];

  const software = [
  'Unity Engine 2021.3',
  'Visual Studio 2022',
  ];

  return (
    <ProjectPage
      title ="Aufwind"
      image={banner}
      description="Multisensorisches, immersives VR-Erlebnis. In diesem Projekt wird die Geschichte der ersten deutschen Pilotinnen erzählt, 
      dauerhaft für Besucher ausgestellt in Essen."
      role='Programmierung, Erstellung von Animationen innerhalb der Engine, Implementierung von Hand-Tracking-Interaktionen'
      infoTexts={["22", "2021 - 2024", "Unity Engine"]}
      software={software}
      hardware={hardware}
      sideImage={sideImage}
    />
  );
}

export default AufwindPage;
