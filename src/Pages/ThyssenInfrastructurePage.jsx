import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';

import titleImage from '../assets/images/ThyssenInfrastructure/Terra_infrastructure.jpg';
import sideImage from '../assets/images/ThyssenInfrastructure/Screenshot_1_-Ocean.png';

import img1 from '../assets/images/ThyssenInfrastructure/Screenshot_Ocean_2.png';
import img2 from '../assets/images/ThyssenInfrastructure/Screenshot_Ocean_3.png';
import img3 from '../assets/images/ThyssenInfrastructure/Screenshot_1.png';
import img4 from '../assets/images/ThyssenInfrastructure/Screenshot_Ocean_4.png';

import img5 from '../assets/images/ThyssenInfrastructure/Screenshot_Ocean_6.png';
import img6 from '../assets/images/ThyssenInfrastructure/Screenshot_Ocean_5.png';
import img7 from '../assets/images/ThyssenInfrastructure/Screenshot_7.png';

function ThyssenInfrastructurePage() {
    const hardware = [
    'VR-Brille mit Outside-in Tracking (Valve Index)',
    'Modifizierte Taschenlampe mit Vive Tracker und digital steuerbaren Tasten für Unity',
    'Hand-Tracking-Technologie (Ultraleap)',
    'Multisensorische Integration (Wind), schaltbar über LAN-Steckdosen',
    'Vive Tracker'
    ];
  
    const software = [
    'SteamVR',
    'Unity 2021.3 LTS',
    'Visual Studio 2019',
    'Ultraleap Gemini v5'
    ];

    return (
    <>
    <ProjectPage
      title ="Terra Infrastructure"
      image={titleImage}
      description="Interaktive VR-Experience zur Bohrung im Kappschen Meer für Terra Infrastructure. Die Nutzer:innen 
      erleben eine Fahrt im virtuellen Transportkorb durch mehrere Stationen eines Forschungsschiffs bis zum Meeresgrund. 
      Dort wird der Bohrvorgang – inklusive Sedimentauflockerung durch Vibration – immersiv dargestellt. 
      Ein digitales Tablet mit Handtracking liefert begleitende Informationen und lädt zur Interaktion ein."
      role = {[
      "Programmierung mit Fokus auf den reibungslosen Ablauf der Unity Timeline und die Entwicklung von Mechaniken",
      "Entwicklung einer modifizierten Taschenlampe mit Vive Tracker und digital steuerbaren Inputs für Unity",
      "UX/UI-Design und -Implementierung – sowohl als World-Space-UI als auch als Overlay",
      "Implementierung von Hand-Tracking zur intuitiven Steuerung eines digitalen Tablets",
      ]}
      infoTexts={["7", "Januar 2022 - Oktober 2022", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />

     <ImageCarousel images={[img1, img2, img3, img4, img5, img6, img7]} maxWidth="1000px" />;
    </>
  );
}

export default ThyssenInfrastructurePage;
