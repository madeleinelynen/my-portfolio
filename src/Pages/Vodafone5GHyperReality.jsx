import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Vodafone5GHyperReality/cebit_f4_2.png';
import sideImage from '../assets/images/Vodafone5GHyperReality/sideImage.png';
import YoutubeEmbed from '../components/YoutubeEmbed';
import ImageCarousel from '../components/ImageCarousel';

import { useLanguage } from '../LanguageContext';

// #region ImageCarousel Imports
import img1 from '../assets/images/Vodafone5GHyperReality/cebit_f1.png';
import img2 from '../assets/images/Vodafone5GHyperReality/cebit_f2.png';
import img3 from '../assets/images/Vodafone5GHyperReality/cebit_distortion.png';
import img4 from '../assets/images/Vodafone5GHyperReality/cebit_f3.png';
import img5 from '../assets/images/Vodafone5GHyperReality/cebit_f4.png';
import img6 from '../assets/images/Vodafone5GHyperReality/cebit_f4_2.png';
import img7 from '../assets/images/Vodafone5GHyperReality/dome.png';
//endregion

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
      infoTexts={["16", t(langKey, 'period'), "Unity Engine"]}
      hardware={t(langKey, 'hardware')}
      software={t(langKey, 'software')}
      sideImage={sideImage}
    />

    <div style={{ marginTop: "5rem" }}></div>
    <YoutubeEmbed videoId={videoId} />  

     <ImageCarousel images={[img1, img2, img3, img4, img5, img6, img7]} maxWidth="1000px" />;
    
    </>
  );
}

export default Vodafone5GHyperReality;
