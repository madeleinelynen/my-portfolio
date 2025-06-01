import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/VodafoneOMR/Branding_Lvl04.PNG';
import sideImage from '../assets/images/VodafoneOMR/Lvl01.PNG';

function TirolPage() {
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
    <ProjectPage
      title ="Tirol Experience"
      image={titleImage}
      description="Eine multisensorische Erlebniswelt mit immersivem Storytelling, die in vier 
      verschiedenen Räumen interaktive Ausstellungen bietet und die Geschichte Tirols erzählt. 
      Diese Experience ist als permanentes Museum in Innsbruck ausgestellt."
      role='Programmierung des VR-Projektes, UI-Implementierung und -Programmierung, 
      Hand-Tracking Implementierung'
      infoTexts={["21", "2022 - 2023", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />
  );
}

export default TirolPage;