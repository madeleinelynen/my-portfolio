import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/VodafoneOMR/Branding_Lvl04.PNG';
import sideImage from '../assets/images/VodafoneOMR/Lvl01.PNG';

function EssenCityguide() {
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
      title ="Essen 1887"
      image={titleImage}
      description="Eine AR-basierte Zeitreise durch die Geschichte Essens, bei der Besucher mittels einer 
      Mixed-Reality-Brille und Android-Smartphone durch die Innenstadt navigieren und an GPS-gestützten 
      Punkten historische Stadtansichten sowie Ereignisse in AR erleben können."
      role="Entwicklung interaktiver Mechaniken, Verwaltung der vom Unternehmen für das Projekt genutzten 
      Hardware durch das online Next-Gen Device Management Esper"
      infoTexts={["8", "2021 - 2023", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />
  );
}

export default EssenCityguide;
