import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/VodafoneOMR/Branding_Lvl04.PNG';
import sideImage from '../assets/images/VodafoneOMR/Lvl01.PNG';

function VodafoneOMRPage() {
    const hardware = [
    'HTC Vive Focus 2',
    'Tactical Haptics Controller',
    'Multisensorische Integration (Duft, Hitze), schaltbar über LAN-Steckdosen',
    ];
  
    const software = [
    'Unity Engine 2021.1.16',
    'Visual Studio 2022',
    'HTC Vive Focus Trackingspace'
    ];

  return (
    <ProjectPage
      title ="Vodafone OMR"
      image={titleImage}
      description="Lokaler VR-Multiplayer für bis zu vier Spielern, die in einer digitalen Arena in vier 
      verschiedenen Leveln und jeweils vier verschiedenen Mechaniken um die meisten Punkte kämpfen müssen"
      role="Programmierung unter Nutzung der implementierten MLAPI, UI/UX-Implementierung und Programmierung, 
      Implementierung von Feedback auf der haptischen Weste, technischer Support auf der OMR"
      infoTexts={["8", "Januar 2022 - Mai 2022", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />
  );
}

export default VodafoneOMRPage;
