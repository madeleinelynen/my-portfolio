import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';
import { useLanguage } from '../LanguageContext'; 

import banner from '../assets/images/Aufwind/Banner.png';
import sideImage from '../assets/images/Aufwind/Aufwind_keyvisual_Poster.jpg';

// #region ImageCarousel Imports
import img1 from '../assets/images/Aufwind/vlcsnap-2025-07-08-15h07m49s889.png';
import img2 from '../assets/images/Aufwind/Planetoy_Editor_2.PNG';
import img3 from '../assets/images/Aufwind/Screenshot_aaa50705c.png';
import img4 from '../assets/images/Aufwind/vlcsnap-2025-07-08-15h08m08s817.png';
import img5 from '../assets/images/Aufwind/vlcsnap-2025-07-08-15h09m59s689.png';
import img6 from '../assets/images/Aufwind/Screenshot_473ff.png';
// endregion

function AufwindPage() {
  const {t} = useLanguage();
  const langKey = "aufwind";

  return (
    <>
    <ProjectPage
      title ="Aufwind"
      image={banner}
      description= {t(langKey, 'description')}
      role = {t(langKey, 'role')}
      infoTexts={["22", "2021 - 2024", "Unity Engine"]}
      hardware={t(langKey, 'hardware')}
      software={t(langKey, 'software')}
      sideImage={sideImage}
      websiteLink='https://www.aufwindvr.com/'
    />

      <ImageCarousel images={[img1, img2, img3, img4, img5, img6]} maxWidth="1000px" />;
    </>   
  );
}

export default AufwindPage;
