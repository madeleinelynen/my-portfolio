import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Tirol/Banner.png';
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
      title ="Experience Tirol"
      image={titleImage}
      description="Eine multisensorische Erlebniswelt mit immersivem Storytelling, die in vier 
      verschiedenen Räumen interaktive Ausstellungen bietet und die Geschichte Tirols erzählt. 
      Diese Experience ist als permanentes Museum in Innsbruck ausgestellt."
      role='Ich habe die Verantwortung für die "Zeitreise"-Scene erhalten. Programmierung des VR-Projektes, 
      UI-Implementierung und -Programmierung, Hand-Tracking Implementierung'
      infoTexts={["21", "2022 - 2023", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
      websiteLink='https://www.experiencetirol.com/'
    />
  );
}

export default TirolPage;