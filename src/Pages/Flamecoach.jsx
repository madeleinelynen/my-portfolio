import { useLanguage } from '../LanguageContext';
import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';

import titleImage from '../assets/images/Flamecoach/Banner.png';
import sideImage from '../assets/images/Flamecoach/FC_Extinguisher.jpg';

// #region ImageCarousel Imports
import img1 from '../assets/images/Flamecoach/Screenshot_Office_5.png';
import img2 from '../assets/images/Flamecoach/Screenshot_Bus_Luxemburg.png';
import img3 from '../assets/images/Flamecoach/Flamecoach_2025-06-01_15-44-01.png';
import img4 from '../assets/images/Flamecoach/Screenshot_Office_3.png';
import img5 from '../assets/images/Flamecoach/unknown3.png';

import imgUI1 from '../assets/images/Flamecoach/Flamecoach_UI_2025-05-24_20-37-09.png';
import imgUI2 from '../assets/images/Flamecoach/Flamecoach_UI_2025-05-24_20-37-42.png';
import imgUI3 from '../assets/images/Flamecoach/Flamecoach_UI_2025-05-24_20-38-14.png';
// endregion

function FlamecoachPage() {
  const {t} = useLanguage();
  const langKey = "flamecoach";

  return (
    <>
    <ProjectPage
    title ="Flamecoach"
      image={titleImage}
      description= {t(langKey, 'description')}
      role = {t(langKey, 'role')}
      infoTexts={["10", `2019 - ${t(langKey, 'timeIcon')}`, "Unity Engine"]}
      hardware={t(langKey, 'hardware')}
      software={t(langKey, 'software')}
      sideImage={sideImage}
      websiteLink='https://www.flamecoach.com'
    />

    <ImageCarousel images={[img1, img2, img3, img4, img5]} maxWidth="1000px" />;
    <ImageCarousel images={[imgUI1, imgUI2, imgUI3 ]} maxWidth="1000px" />;
    </> 
  );
}

export default FlamecoachPage;
