import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Aufwind/PortfolioTitle.png';
import sideImage from '../assets/images/Aufwind/PortfolioTitle.png';

function AufwindPage() {
  const hardware = [
  'Yaw Motion Seat',
  'Varjo Aero',
  'Ultraleap'
  ];

  const software = [
  'Unity Engine 2021.3',
  'Visual Studio 2022',
  ];

  return (
    <ProjectPage
      title ="Aufwind"
      image={titleImage}
      description="Multisensorisches, immersives VR-Erlebnis. In diesem Projekt wird die Geschichte der ersten deutschen Pilotinnen erzählt, 
      dauerhaft für Besucher ausgestellt in Essen."
      infoTexts={["22", "2021 - 2024", "Unity Engine"]}
      software={software}
      hardware={hardware}
      sideImage={sideImage}
    />
  );
}

export default AufwindPage;
