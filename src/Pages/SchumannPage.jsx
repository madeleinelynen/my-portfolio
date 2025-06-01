import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/VodafoneOMR/Branding_Lvl04.PNG';
import sideImage from '../assets/images/VodafoneOMR/Lvl01.PNG';

function SchumannPage() {
    const hardware = [
    'Valve Index',
    'Multisensorische Integration (Duft), schaltbar über LAN-Steckdosen',
    'Leap Motion',
    ];
  
    const software = [
    'Unity Engine 2019.2',
    'Visual Studio 2019',
    'Steam VR',
    'Leap Motion Software'
    ];

  return (
    <ProjectPage
      title ="Schumann VR"
      image={titleImage}
      description="Multisensorische VR-Experience mit immersivem Storytelling über das Leben von 
      Robert Schumann, welche zeitweise als kostenpflichtiges Erlebnis in Düsseldorf ausgestellt wurde"
      role="Programmierung, UX/UI-Integration und -Programmierung, Hand-Tracking Implementierung"
      infoTexts={["8", "Mai 2019 - Oktober 2019", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />
  );
}

export default SchumannPage;
