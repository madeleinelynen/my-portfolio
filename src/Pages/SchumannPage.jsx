import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Schumann/Title.jpg';
import sideImage from '../assets/images/Schumann/sideImage.jpg';

function SchumannPage() {
    const hardware = [
    'Valve Index',
    'Multisensorische Integration (Duft), schaltbar über LAN-Steckdosen',
    'Hand-Tracking-Technologie (Leap Motion)',
    ];
  
    const software = [
    'SteamVR',
    'Unity 2018.4 LTS',
    'Visual Studio 2017',
    'Leap Motion Orion SDK v4'
    ];

  return (
    <ProjectPage
      title ="Schumann VR"
      image={titleImage}
      description="Multisensorische VR-Experience mit immersivem Storytelling über das Leben von 
      Robert Schumann, welche zeitweise als kostenpflichtiges Erlebnis in Düsseldorf ausgestellt wurde"
      role = {[
      "Programmierung, u.a. Scene-Management und interaktive Mechaniken in verschiednene Szenen",
      "Implementierung und technische Anbindung von User Interface",
      "Hand-Tracking Implementierung und Entwicklung von interaktiven Handmechaniken",
      ]}
      infoTexts={["10", "Mai 2019 - Oktober 2019", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
      websiteLink='https://www.neonreal.com/schumannvr'
    />
  );
}

export default SchumannPage;
