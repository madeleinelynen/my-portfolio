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
    'Taschenlampe mit Vive Tracker',
    'Ultraleap',
    ];
  
    const software = [
    'Unity Engine 2021.???',
    'Visual Studio 2022',
    'Steam VR',
    'Ultraleap'
    ];

  return (
    <>
    <ProjectPage
      title ="Thyssen Infrastructure"
      image={titleImage}
      description="Highscore-basierte VR-Anwendung zur Förderung und Training der Hand- und Augenkoordination 
      von Patienten, möglichst nah am Prinzip der Spiegeltherapie, mit der Modifikation vom klassischen 
      Hand-Tracking, sodass gezielt digitale Hände gespiegelt dargestellt werden können."
      role = {[
      "Programmierung mit Fokus auf den reibungslosen Ablauf der Unity Timeline und die Entwicklung einer Hardware Taschenlampe, die in der Experience steuerbar ist",
      "UX/UI-Integration und -Programmierung, sowohl World-Space als auch Overlay, interaktives Tablet",
      "Implementierung von Hand-Tracking für interaktive Steuerung des digitalen Tablets",
      ]}
      infoTexts={["8", "20?? - 20??", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />

     <ImageCarousel images={[img1, img2, img3, img4, img5, img6, img7]} maxWidth="1000px" />;
    </>
  );
}

export default ThyssenInfrastructurePage;
