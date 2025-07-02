import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/SoftRevision/Banner.jpg';
import sideImage from '../assets/images/VodafoneOMR/Lvl01.PNG';

function SoftRevisionPage() {
    const hardware = [
    'Vive Pro Eye',
    'Tactical Haptics Controller',
    'Ultraleap',
    ];
  
    const software = [
    'Unity Engine 2021.???',
    'Visual Studio 2022',
    'Steam VR',
    'Ultraleap'
    ];

  return (
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
  );
}

export default SoftRevisionPage;
