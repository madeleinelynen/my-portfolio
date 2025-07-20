import { createContext, useContext, useState, useEffect } from 'react';
import translations from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ initialLang, children }) => {
  const [language, setLanguage] = useState(initialLang || 'de');

  useEffect(() => {
    setLanguage(initialLang);
  }, [initialLang]);

  const t = (section, key) => {
    return translations[language]?.[section]?.[key] || `${section}.${key}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
