import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';
import { useLanguage } from '../LanguageContext';

import titleImage from '../assets/images/ThyssenInfrastructure/Terra_infrastructure.jpg';
import sideImage from '../assets/images/ThyssenInfrastructure/Screenshot_1_-Ocean.png';

// #region ImageCarousel Imports
import img1 from '../assets/images/ThyssenInfrastructure/Screenshot_Ocean_2.png';
import img2 from '../assets/images/ThyssenInfrastructure/Screenshot_Ocean_3.png';
import img3 from '../assets/images/ThyssenInfrastructure/Screenshot_1.png';
import img4 from '../assets/images/ThyssenInfrastructure/Screenshot_Ocean_4.png';
import img5 from '../assets/images/ThyssenInfrastructure/Screenshot_Ocean_6.png';
import img6 from '../assets/images/ThyssenInfrastructure/Screenshot_Ocean_5.png';
import img7 from '../assets/images/ThyssenInfrastructure/Screenshot_7.png';
//endregion

function ThyssenInfrastructurePage() {
  const {t} = useLanguage();
  const langKey = "terraInfra";

    return (
    <>
    <ProjectPage
      title ="Terra Infrastructure"
      image={titleImage}
      description= {t(langKey, 'description')}
      role = {t(langKey, 'role')}
      infoTexts={["7", "Januar 2022 - Oktober 2022", "Unity Engine"]}
      hardware={t(langKey, 'hardware')}
      software={t(langKey, 'software')}
      sideImage={sideImage}
    />

     <ImageCarousel images={[img1, img2, img3, img4, img5, img6, img7]} maxWidth="1000px" />;
    </>
  );
}

export default ThyssenInfrastructurePage;
