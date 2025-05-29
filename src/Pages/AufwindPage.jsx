import ProjectPage from '../components/ProjectPage';
import flamecoachBild from '../assets/images/Aufwind/Aufwind_Title.png';

function AufwindPage() {
  return (
    <ProjectPage
      title="Multisensorisches, immersives VR-Erlebnis"
      image={flamecoachBild}
      description="In diesem Projekt wird die Geschichte der ersten deutschen Pilotinnen erzählt, 
      dauerhaft für Besucher ausgestellt in Essen."
    //   projectPeriod="2019 - heute"
    />
  );
}

export default AufwindPage;
