import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/EssenCityguide/Banner.png';
import sideImage from '../assets/images/EssenCityguide/sideImage.jpg';
import YoutubeEmbed from '../components/YoutubeEmbed';

function EssenCityguide() {
    const hardware = [
    'xReal (heute: nReal)',
    'Android Smartphone'
    ];
  
    const software = [
    'Unity Engine 2021.2',
    'Visual Studio',
    'Device Management Tool (Esper)'
    ];

        const myVideoId = "iqLJLlujaTw";


  return (
    <>
    <ProjectPage
      title ="Essen 1887"
      image={titleImage}
      description="Eine Mixed-Reality-Zeitreise durch die Geschichte Essens, bei der Besucher mittels einer 
      Mixed-Reality-Brille und Android-Smartphone durch die Innenstadt navigieren und an GPS-gestützten 
      Punkten historische Stadtansichten sowie Ereignisse in AR erleben können."
      role="Entwicklung interaktiver Mechaniken, Verwaltung der vom Unternehmen für das Projekt genutzten 
      Hardware durch das online Next-Gen Device Management Esper"
      infoTexts={["8", "2021 - 2023", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />

    <div style={{ marginTop: "5rem" }}></div>
    <YoutubeEmbed videoId={myVideoId} />
    
    </>
  );
}

export default EssenCityguide;
