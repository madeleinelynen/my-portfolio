import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Vodafone5GHyperReality/Tile.png';
import sideImage from '../assets/images/Vodafone5GHyperReality/Tile.png';
import YoutubeEmbed from '../components/YoutubeEmbed';

import { useLanguage } from '../LanguageContext';

function Vodafone5GHyperReality() {
  const {t} = useLanguage();
  const langKey = "vodafone5GHyperReality";

    const videoId = "oekP3x8-bjc";

  return (
    <>
    <ProjectPage
      title ="Vodafone 5G Hyper‑Reality Experience"
      image={titleImage}
      description={t(langKey, 'description')}
      role = {t(langKey, 'role')}
      infoTexts={["11", "April 2018 - Juni 2018", "Unity Engine"]}
      hardware={t(langKey, 'hardware')}
      software={t(langKey, 'software')}
      sideImage={sideImage}
    />

    <div style={{ marginTop: "5rem" }}></div>
    <YoutubeEmbed videoId={videoId} />  
    
    </>
  );
}

export default Vodafone5GHyperReality;
