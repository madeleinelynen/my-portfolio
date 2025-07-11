import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';

import titleImage from '../assets/images/SoftRevision/Banner.jpg';
import sideImage from '../assets/images/SoftRevision/Screenshot_Level_03.png';

// #region ImageCarousel Imports
import img1 from '../assets/images/SoftRevision/Screenshot_Level_01_105524.png';
import img2 from '../assets/images/SoftRevision/Screenshot_Level_01_.png';
import img3 from '../assets/images/SoftRevision/Screenshot_Level_01_113810.png';
import img4 from '../assets/images/SoftRevision/Softrevision_Web3.jpg';
//endregion

function SoftRevisionPage() {
    const hardware = [
    'Vive Pro Eye',
    'Tactical Haptics Controller',
    'Hand-Tracking-Technologie (Ultraleap)',
    'Ultraleap',
    ];
  
    const software = [
    'Unity 2021.3 LTS',
    'Visual Studio 2019',
    'SteamVR',
    'Vive Input Utility (VIU)',
    'SRanipal SDK (für Eye Tracking)',
    'Ultraleap Gemini v5'
    ];

  return (
    <>
    <ProjectPage
      title ="Soft Revision"
      image={titleImage}
      description="Highscore-basierte VR-Anwendung zur Förderung und Training der Hand- und Augenkoordination 
      von Patienten, möglichst nah am Prinzip der Spiegeltherapie, mit der Modifikation vom klassischen 
      Hand-Tracking, sodass gezielt digitale Hände gespiegelt dargestellt werden können."
      role = {[
      "Programmierung mit Fokus auf der Entwicklung eines angepassten Hand-Greifsystems und Highscore Systems",
      " UX/UI-Integration und -Programmierung",
      "Hand-Tracking Implementierung",
      ]}
      infoTexts={["8", "2021 - 2022", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />

    <ImageCarousel images={[img1, img2, img3, img4]} maxWidth="1000px" />;
    </>
  );
}

export default SoftRevisionPage;
