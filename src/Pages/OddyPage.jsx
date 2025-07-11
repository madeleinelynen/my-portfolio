import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';

import titleImage from '../assets/images/Oddy/Banner.png';
import sideImage from '../assets/images/Oddy/Screenshot_Level00_Tutorial_164845.png';

// #region ImageCarousel Imports
import img1 from '../assets/images/Oddy/Screenshot_Level00_Tutorial_164845.png';
import img2 from '../assets/images/Oddy/Bildschirmfoto+2023-03-02+um+17.05.03.png';
import img3 from '../assets/images/Oddy/Oddy-07.jpg';
import img4 from '../assets/images/Oddy/Oddy-14.jpg';
// endregion

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
     <>
    <ProjectPage
      title ="Oddy VR"
      image={titleImage}
      description="Ein rätselbasiertes Spiel für fünf Spieler, bei dem vier über Smartphones 
      und der fünfte Spieler über eine VR-Brille in einem lokalen Multiplayer-Erlebnis interagieren. 
      Als Multi-Plattform Couch-Koop-Indie-Game kommt Oddy in von der afj betreuten Jugendzentren in der ganzen
      Bundesrepublik zum Einsatz."
      role = {[
      "Übernahme der Programmierleitung",
      "Programmierung von Game Mechaniken unter Nutzung der implementierten MLAPI",
      "Game Design/Level Design",
      " UI-Integration und -Programmierung",
      ]}
      infoTexts={["8", "2021 - 2024", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
      websiteLink='https://jugendpastoral.de/news-und-tipps/253-oddy'
    />
    <ImageCarousel images={[img1, img2, img3, img4]} maxWidth="1000px" />;
    </>
  );
}

export default OddyPage;
