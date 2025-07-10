import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';

import titleImage from '../assets/images/Tirol/Banner.jpg';
import sideImage from '../assets/images/Tirol/sideImage.jpg';

import img1 from '../assets/images/Tirol/vlcsnap-2025-07-08-11h25m00s791.png';
import img2 from '../assets/images/Tirol/vlcsnap-2025-07-08-11h23m16s961.png';
import img3 from '../assets/images/Tirol/vlcsnap-2025-07-08-11h29m49s586.png';
import img4 from '../assets/images/Tirol/vlcsnap-2025-07-08-11h26m27s257.png';
import img5 from '../assets/images/Tirol/vlcsnap-2025-07-08-11h26m56s850.png';
import img6 from '../assets/images/Tirol/vlcsnap-2025-07-08-11h27m42s671.png';
import img7 from '../assets/images/Tirol/vlcsnap-2025-07-08-11h28m33s982.png';


function TirolPage() {
    const hardware = [
    'HP Reverb G2',
    'Hand-Tracking-Technologie (Ultraleap)',
    'Multisensorische Integration (Duft, Wind), schaltbar über LAN-Steckdosen',
    ];
  
    const software = [
    'Unity 2022.3 LTS',
    'Visual Studio 2022',
    'Windows Mixed Reality Runtime / OpenXR',
    'Ultraleap Gemini v5'
    ];

  return (
    <>
    <ProjectPage
      title ="Experience Tirol"
      image={titleImage}
      description="Eine multisensorische Erlebniswelt mit immersivem Storytelling, die in vier 
      verschiedenen Räumen interaktive Ausstellungen bietet und die Geschichte Tirols erzählt. 
      Diese Experience ist als permanentes Museum in Innsbruck ausgestellt."
      role = {[
      "Programmierung und Umsetzung der Zeitreise-Szene",
      "Implementierung und technische Anbindung von User Interface",
      "Integration von Hand-Tracking"
      ]}
      infoTexts={["21", "2022 - 2023", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
      websiteLink='https://www.experiencetirol.com/'
    />
    <ImageCarousel images={[img1, img2, img3, img4, img5, img6, img7]} maxWidth="1000px" />;
    </>
  );
}

export default TirolPage;