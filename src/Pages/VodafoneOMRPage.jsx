import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';

import titleImage from '../assets/images/VodafoneOMR/Title.jpg';
import sideImage from '../assets/images/VodafoneOMR/vlcsnap-2025-07-08-15h26m50s248.png';

// #region ImageCarousel Imports
import img1 from '../assets/images/VodafoneOMR/Lvl02_Tutorial.PNG';
import img2 from '../assets/images/VodafoneOMR/vlcsnap-2025-07-08-15h25m55s803.png';
import img3 from '../assets/images/VodafoneOMR/vlcsnap-2025-07-08-15h26m01s907.png';
import img4 from '../assets/images/VodafoneOMR/Branding_Lvl04.PNG';
import img5 from '../assets/images/VodafoneOMR/vlcsnap-2025-07-08-15h27m02s036.png';
import img6 from '../assets/images/VodafoneOMR/vlcsnap-2025-07-08-15h27m42s845.png';
//endregion

function VodafoneOMRPage() {
    const hardware = [
    'HTC Vive Focus 2',
    'TactSuit (haptische Weste)',
    'Multisensorische Integration (Duft, Hitze), schaltbar über LAN-Steckdosen',
    ];
  
    const software = [
    'Unity 2021.3 LTS',
    'Visual Studio 2022',
    'bHaptics',
    'IK',
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
    <ImageCarousel images={[img1, img2, img3, img4, img5, img6]} maxWidth="1000px" />;
    </>
  );
}

export default VodafoneOMRPage;
