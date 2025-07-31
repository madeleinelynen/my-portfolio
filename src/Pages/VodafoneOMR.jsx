import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';

import titleImage from '../assets/images/VodafoneOMR/Title.jpg';
import sideImage from '../assets/images/VodafoneOMR/vlcsnap-2025-07-08-15h26m50s248.png';

// #region ImageCarousel Imports
import img1 from '../assets/images/VodafoneOMR/Lvl02_Tutorial.PNG';
import img2 from '../assets/images/VodafoneOMR/vlcsnap-2025-07-08-15h25m55s803.png';
import img3 from '../assets/images/VodafoneOMR/vlcsnap-2025-07-08-15h26m01s907.png';
import img4 from '../assets/images/VodafoneOMR/Branding_Lvl04.PNG';
import img5 from '../assets/images/VodafoneOMR/vlcsnap-2025-07-08-15h27m02s036.png';
import img6 from '../assets/images/VodafoneOMR/vlcsnap-2025-07-08-15h27m42s845.png';
//endregion

import { useLanguage } from '../LanguageContext';

function VodafoneOMRPage() {
  const {t} = useLanguage();
  const langKey = "vodafoneOMR";

  return (
    <>
    <ProjectPage
      title ="Vodafone OMR"
      image={titleImage}
      description= {t(langKey, 'description')}
      role = {t(langKey, 'role')}
      infoTexts={["8", t(langKey, 'period'), "Unity Engine"]}
      hardware={t(langKey, 'hardware')}
      software={t(langKey, 'software')}
      sideImage={sideImage}
    />
    <ImageCarousel images={[img1, img2, img3, img4, img5, img6]} maxWidth="1000px" />;
    </>
  );
}

export default VodafoneOMRPage;
