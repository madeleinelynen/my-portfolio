import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';
import { useLanguage } from '../LanguageContext';

import titleImage from '../assets/images/SoftRevision/Banner.jpg';
import sideImage from '../assets/images/SoftRevision/Screenshot_Level_03.png';

// #region ImageCarousel Imports
import img1 from '../assets/images/SoftRevision/Screenshot_Level_01_105524.png';
import img2 from '../assets/images/SoftRevision/Screenshot_Level_01_.png';
import img3 from '../assets/images/SoftRevision/Screenshot_Level_01_113810.png';
import img4 from '../assets/images/SoftRevision/Softrevision_Web3.jpg';
//endregion

function SoftRevisionPage() {
  const {t} = useLanguage();
  const langKey = 'softRevision';

  return (
    <>
    <ProjectPage
      title ="Soft Revision"
      image={titleImage}
      description={t(langKey, 'description')}
      role ={t(langKey, 'role')}
      infoTexts={["8", "2021 - 2022", "Unity Engine"]}
      hardware={t(langKey, 'hardware')}
      software={t(langKey, 'software')}
      sideImage={sideImage}
    />

    <ImageCarousel images={[img1, img2, img3, img4]} maxWidth="1000px" />;
    </>
  );
}

export default SoftRevisionPage;
