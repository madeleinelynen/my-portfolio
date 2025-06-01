import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Oddy/PortfolioTitle.png';
import sideImage from '../assets/images/Oddy/Screenshot_Level00_Tutorial_164845.png';

function OddyPage() {
    const hardware = [
    'Meta Quest 2',
    'Android Smartphones',
    'Mobiler Router für lokales Netzwerk',
    ];
  
    const software = [
    'Unity Engine 2021.1.16',
    'Visual Studio 2022',
    ];

  return (
    <ProjectPage
      title ="Oddy VR"
      image={titleImage}
      description="Ein rätselbasiertes Spiel für fünf Spieler, bei dem vier über Smartphones 
      und der fünfte Spieler über eine VR-Brille in einem lokalen Multiplayer-Erlebnis interagieren. 
      Als Multi-Plattform Couch-Koop-Indie-Game kommt Oddy in von der afj betreuten Jugendzentren in der ganzen
      Bundesrepublik zum Einsatz."
      role="Übernahme der Programmierleitung, Programmierung von Game Mechaniken unter Nutzung der 
      implementierten MLAPI, Game Design, UI-Integration und -Programmierung"
      infoTexts={["8", "2021 - 2024", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />
  );
}

export default OddyPage;
