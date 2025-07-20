import './LanguageController.css';
import { useLanguage } from './LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';

const LanguageController = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLang) => {
    if (newLang === language) 
      return;

    const pathWithoutLang = location.pathname.replace(/^\/(en|de)/, '');
    navigate(`/${newLang}${pathWithoutLang}`);
  };

  return (
    <div className="language-switcher">
      <button
        className={`lang-button ${language === 'en' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('en')}
      >
        EN
      </button>
      <button
        className={`lang-button ${language === 'de' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('de')}
      >
        DE
      </button>
    </div>
  );
};

export default LanguageController;

