import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';
import { useLanguage } from '../LanguageContext';

import titleImage from '../assets/images/Oddy/Banner.png';
import sideImage from '../assets/images/Oddy/Screenshot_Level00_Tutorial_164845.png';

// #region ImageCarousel Imports
import img1 from '../assets/images/Oddy/Screenshot_Level00_Tutorial_164845.png';
import img2 from '../assets/images/Oddy/Bildschirmfoto+2023-03-02+um+17.05.03.png';
import img3 from '../assets/images/Oddy/Oddy-07.jpg';
import img4 from '../assets/images/Oddy/Oddy-14.jpg';
// endregion

function OddyPage() {
  const {t} = useLanguage();

  const hardware = t('oddy', 'hardware');
  const software = t('oddy', 'software');

  return (
     <>
    <ProjectPage
      title ="Oddy VR"
      image={titleImage}
      description= {t('oddy', 'description')}
      role = {t('oddy', 'role')}
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
