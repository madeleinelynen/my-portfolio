import "./About.css";
import { useLanguage } from './LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
  <div className="about-section">
    <h1 className="about-heading"></h1>
      <div className="about-grid">
          <section>
            <h1 className="about-subheading">{t('about', 'subheaderAbout')}</h1>
            <p>{t('about', 'descriptionAbout')}</p>
          </section>

          <section>
            <h2 className="about-subheading">{t('about', 'subheaderCompetencies')}</h2>
            <ul>
                {t('about', 'descriptionCompetencies').map((descr, i) => (
                  <li key={i}>{descr}</li>
                ))}   
            </ul>
          </section>

          <section>
            <h3 className="about-subheading">{t('about', 'subheaderAchievements')}</h3>
            <ul>
              {t('about', 'descriptionAchievements').map((descr, i) => (
                  <li key={i}>{descr}</li>
                ))}   
            </ul>
          </section>

          <section>
            <h4 className="about-subheading">{t('about', 'subheaderCollaborationSkills')}</h4>
            <ul>
              {t('about', 'descriptionCollaborationSkills').map((descr, i) => (
                  <li key={i}>{descr}</li>
                ))}   
            </ul>
          </section>

          <section>
            <h2 className="about-subheading">{t('about', 'subheaderExperiences')}</h2>
            <p className="font-semibold">
              {t('about', 'position')}<br />
              {t('about', 'company')} | {t('about', 'date')}
            </p>
            <ul>
              {t('about', 'descriptionExperiences').map((descr, i) => (
                  <li key={i}>{descr}</li>
                ))}  
            </ul>
          </section>

          <section>
            <h2 className="about-subheading">{t('about', 'subheaderEducation')}</h2>
            <p className="font-semibold">
              Game Design B.Sc.<br />Mediadesign Hochschule, Düsseldorf (2015–2019)
            </p>
            <ul>
              {t('about', 'descriptionEducation').map((descr, i) => (<li key={i}>{descr}</li>))}
            </ul>
          </section>

    </div>
  </div>
  );
};

export default About;



