import './LanguageController.css';
import { useLanguage } from './LanguageContext';

const LanguageController = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
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
