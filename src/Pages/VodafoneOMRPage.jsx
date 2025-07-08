import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';

import titleImage from '../assets/images/VodafoneOMR/Title.jpg';
import sideImage from '../assets/images/VodafoneOMR/Lvl01.PNG';

import img1 from '../assets/images/VodafoneOMR/Lvl01.PNG';
import img2 from '../assets/images/VodafoneOMR/Lvl01_Game.PNG';
import img3 from '../assets/images/VodafoneOMR/Lvl04_Game.PNG';
import img4 from '../assets/images/VodafoneOMR/Branding_Lvl04.PNG';

function VodafoneOMRPage() {
    const hardware = [
    'HTC Vive Focus 2',
    'Tactical Haptics Controller',
    'Multisensorische Integration (Duft, Hitze), schaltbar über LAN-Steckdosen',
    ];
  
    const software = [
    'Unity Engine 2021.???',
    'Visual Studio 2022',
    'HTC Vive Focus Trackingspace'
    ];

  return (
    <>
    <ProjectPage
      title ="Vodafone OMR"
      image={titleImage}
      description="Lokaler VR-Multiplayer für bis zu vier Spielern, die in einer digitalen Arena in vier 
      verschiedenen Leveln und jeweils vier verschiedenen Mechaniken um die meisten Punkte kämpfen müssen"
           role = {[
            "Programmierung unter Nutzung der implementierten MLAPI",
            "UX/UI-Entwicklung und -Integration",
            "Implementierung von Feedback auf der haptischen Weste",
            "Technischer Support auf der OMR",
            ]}
      infoTexts={["8", "Januar 2022 - Mai 2022", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />
    <ImageCarousel images={[img1, img2, img3, img4]} maxWidth="1000px" />;
    </>
  );
}

export default VodafoneOMRPage;
