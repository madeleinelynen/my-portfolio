import { useState, useEffect } from 'react';
import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';
import CodeToggler from '../components/CodeToggler';
import FullWidthImage from '../components/FullWidthImage';

import './Flamecoach2.css';
import { useLanguage } from '../LanguageContext';

import titleImage from '../assets/images/Flamecoach2/Banner.jpg';
import sideImage from '../assets/images/Flamecoach2/F2_modells.png';

import img1 from '../assets/images/Flamecoach2/Setup_Beispiel_01.png';
import img2 from '../assets/images/Flamecoach2/AwgInspector.png';

// #region ImageCarousel Imports
import imgUI_cal from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Cal_AWG.png';
import imgUI_tracker from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Tracker_2.png';
import imgUI_Scenes from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Scenes.png';
import imgUI_Pl_02 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.2.png';
import imgUI_Pl_03 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.3.png';
import imgUI_Pl_04 from '../assets/images/Flamecoach2/UI/Flamecoach2_UI_Playlist_1.4.png';
// endregion

function Flamecoach2Page() {
  const {t} = useLanguage();
  const langKey = "flamecoach2";

  const [setInputExtinguisher] = useState('');
  const [setTrackerManager] = useState('');
  const [awgInput, setAwgInput] = useState('');

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/Extinguisher/ExtinguisherInputManager.cs')
      .then(res => res.text())
      .then(setInputExtinguisher)
      .catch(err => console.error('Error loading ExtinguisherInputManager', err));

    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/ExtinguisherTrackerIdManager.cs')
      .then(res => res.text())
      .then(setTrackerManager)
      .catch(err => console.error('Error loading ExtinguisherTrackerIdManager', err));

    fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/Extinguisher/AWG/AWGNozzleInputManager.cs')
      .then(res => res.text())
      .then(setAwgInput)
      .catch(err => console.error('Error loading AWGNozzleInputManager', err));
  }, []);

  return (
    <div className="page-container">
      <ProjectPage
        title="Flamecoach 2"
        image={titleImage}
        description= {t(langKey, 'description')}
        role={t(langKey, 'role')}
        infoTexts={["9", `2023 - ${t(langKey, 'timeIcon')}`, "Unity Engine"]}
        hardware={t(langKey, 'hardware')}
        software={t(langKey, 'software')}
        sideImage={sideImage}
      />

    <div className="section-container">
      <h2 className="section-title">{t(langKey, 'awgInputTitle')}</h2>
      <h3 className="section-subtitle">{t(langKey, 'awgInputSubtitle')}</h3>
        <FullWidthImage src={img2} alt="img2"/>

        <div className="integration-column">
          <ul className="integration-points">
            {t(langKey, 'awgInputScript').map((descr, i) => (<li key={i}>{descr}</li>))}
          </ul>
          {awgInput && <CodeToggler code={awgInput} label="AWGNozzleInputManager.cs" />}
        </div>

    </div>

          <ImageCarousel images={[ imgUI_Scenes, imgUI_cal, imgUI_tracker, imgUI_Pl_02, imgUI_Pl_04,imgUI_Pl_03]} maxWidth="1000px" />;

    </div>
  );
}

export default Flamecoach2Page;
