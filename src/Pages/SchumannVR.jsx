import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Schumann/Title.jpg';
import sideImage from '../assets/images/Schumann/sideImage.jpg';
import { useLanguage } from '../LanguageContext';

function SchumannPage() {
  const {t} = useLanguage();
  const langKey = "schumannVR";

  return (
    <ProjectPage
      title ="Schumann VR"
      image={titleImage}
      description= {t(langKey, 'description')}
      role = {t(langKey, 'role')}
      infoTexts={["10", t(langKey, 'period'), "Unity Engine"]}
      hardware={t(langKey, 'hardware')}
      software={t(langKey, 'software')}
      sideImage={sideImage}
      websiteLink='https://www.neonreal.com/schumannvr'
    />
  );
}

export default SchumannPage;
