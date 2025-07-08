import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';
import titleImage from '../assets/images/Flamecoach/Banner.jpeg';

import img1 from '../assets/images/Flamecoach/FC_Extinguisher.jpg';
import img2 from '../assets/images/Flamecoach/Screenshot_Bus_Luxemburg.jpeg';
import img3 from '../assets/images/Flamecoach/Flamecoach_2025-06-01_15-44-01.png';
import img4 from '../assets/images/Flamecoach/Screenshot_Office_3.jpeg';
import img5 from '../assets/images/Flamecoach/unknown3.png';

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
  
  return (
    <>
    <ProjectPage
    title ="Flamecoach"
      image={titleImage}
      description="VR-Simulation zur Brandbekämpfung in verschiedenen Szenarien.
      Ein realer Feuerlöscher wird mit firmeneigener Hardware und Trackern ausgestattet, 
      sodass er in der virtuellen Umgebung ebenso sichtbar und steuerbar ist wie in der realen Welt. 
      Das System wurde bereits an mehr als 30 Kunden verkauft, darunter BMW, Daimler, Securitas und Commerzbank."
      role = {[
      "Programmierung, inklusive Integration von Inputs der firmeneigenen Hardware",
      "Verantwortung für UX/UI-Entwicklung und -Integration",
      "Erstellung von Animationen innerhalb der Engine",
      "Implementierung von Hand-Tracking-Interaktionen",
      "Einrichtung für Neukunden und Versionsverwaltung mit regelmäßigen Updates für Bestandskunden"
      ]}
      infoTexts={["10", "2019 - heute", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={img1}
      websiteLink='https://www.flamecoach.com'
    />

    <ImageCarousel images={[img1, img2, img3, img4, img5]} maxWidth="1000px" />;
    </> 
  );
}

export default FlamecoachPage;
