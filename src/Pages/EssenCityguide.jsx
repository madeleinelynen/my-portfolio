import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/EssenCityguide/sideImage.jpg';
import sideImage from '../assets/images/EssenCityguide/sideImage.png';
import YoutubeEmbed from '../components/YoutubeEmbed';

import { useLanguage } from '../LanguageContext';

function EssenCityguide() {
  const {t} = useLanguage();
  
  const hardware = t('essen1887', 'hardware');
  const software = t('essen1887', 'software');
  const myVideoId = "iqLJLlujaTw";

  return (
    <>
    <ProjectPage
      title ="Essen 1887"
      image={titleImage}
      description= {t('essen1887', 'description')}
      role= {t('essen1887', 'role')}
      infoTexts={["16", "2021 - 2023", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
      websiteLink='https://www.visitessen.de/essentourismus_tourismusinformation/
essen_1887___eine_mixed_reality_zeitreise/essen_1887.de.html'
    />

    <div style={{ marginTop: "5rem" }}></div>
    <YoutubeEmbed videoId={myVideoId} />  
    </>
  );
}

export default EssenCityguide;
