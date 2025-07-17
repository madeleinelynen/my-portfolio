import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/EssenCityguide/sideImage.jpg';
import sideImage from '../assets/images/EssenCityguide/sideImage.png';
import YoutubeEmbed from '../components/YoutubeEmbed';

import { useLanguage } from '../LanguageContext';

function EssenCityguide() {
  const {t} = useLanguage();
  const langKey = "essen1887";

  const videoId = "iqLJLlujaTw";

  return (
    <>
    <ProjectPage
      title ="Essen 1887"
      image={titleImage}
      description= {t(langKey, 'description')}
      role= {t(langKey, 'role')}
      infoTexts={["16", "2021 - 2023", "Unity Engine"]}
      hardware={t(langKey, 'hardware')}
      software={t(langKey, 'software')}
      sideImage={sideImage}
      websiteLink='https://www.visitessen.de/essentourismus_tourismusinformation/
essen_1887___eine_mixed_reality_zeitreise/essen_1887.de.html'
    />

    <div style={{ marginTop: "5rem" }}></div>
    <YoutubeEmbed videoId={videoId} />  
    </>
  );
}

export default EssenCityguide;
