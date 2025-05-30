import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Aufwind/PortfolioTitle.png';

function AufwindPage() {
  return (
    <ProjectPage
      title="Multisensorisches, immersives VR-Erlebnis"
      image={titleImage}
      description="In diesem Projekt wird die Geschichte der ersten deutschen Pilotinnen erzählt, 
      dauerhaft für Besucher ausgestellt in Essen."
      infoTexts={["2021 - 2024", "Unity Engine", "Programmierung, UX/UI, Animationen"]}
    />
  );
}

export default AufwindPage;
