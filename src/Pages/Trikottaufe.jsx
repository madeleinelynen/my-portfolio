import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Trikottaufe/Banner.png';
import sideImage from '../assets/images/Trikottaufe/sideImage.png';
import YoutubeEmbed from '../components/YoutubeEmbed';

import { useLanguage } from '../LanguageContext';

function TrikottaufePage() {
    const {t} = useLanguage();
    const langKey = "trikottaufe";

    const myVideoId = "_j4HP0J4nxM";

  return (
    <>
    <ProjectPage
      title ="Fortuna Trikottaufe"
      image={titleImage}
      description={t(langKey, 'description')}
      role = {t(langKey, 'role')}
      infoTexts={["3", "Juni 2018 - Juli 2018", "Unity Engine"]}
      hardware={t(langKey, 'hardware')}
      software={t(langKey, 'software')}
      sideImage={sideImage}
    />

    <div style={{ marginTop: "5rem" }}></div>
    <YoutubeEmbed videoId={myVideoId} />

    </>
  );
}

export default TrikottaufePage;
