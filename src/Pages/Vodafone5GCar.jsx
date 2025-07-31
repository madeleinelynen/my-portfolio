import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/5GCar/Banner.png';
import sideImage from '../assets/images/5GCar/Bildschirmfoto 2020-01-30 um 12.24.14.png';

import { useLanguage } from '../LanguageContext';

function VodafoneGigacar() {
  const {t} = useLanguage();
  const langKey = "vodafone5GCar";

  return (
    <ProjectPage
      title ="Vodafone 5G Car"
      image={titleImage}
      description={t(langKey, 'description')}
      role = {t(langKey, 'role')}
      infoTexts={["7", t(langKey, 'period'), "Unity Engine"]}
      hardware={t(langKey, 'hardware')}
      software={t(langKey, 'software')}
      sideImage={sideImage}
    />
  );
}

export default VodafoneGigacar;
