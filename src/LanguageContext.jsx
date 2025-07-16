import { createContext, useContext, useState } from 'react';

import about_de from './locales/de/about.json';
import home_de from './locales/de/home.json';
import homeselection_de from './locales/de/homeselection.json';

import about_en from './locales/en/about.json';
import home_en from './locales/en/home.json';
import homeselection_en from './locales/en/homeselection.json';

import basePage_de from './locales/de/pages/basePage.json';
import basePage_en from './locales/en/pages/basePage.json';
import aufwind_de from './locales/de/pages/aufwind.json';
import aufwind_en from './locales/en/pages/aufwind.json';
import essen1887_de from './locales/de/pages/essen1887.json';
import essen1887_en from './locales/en/pages/essen1887.json';
import flamecoach_de from './locales/de/pages/flamecoach.json';
import flamecoach_en from './locales/en/pages/flamecoach.json';
import flamecoach2_de from './locales/de/pages/flamecoach2.json';
import flamecoach2_en from './locales/en/pages/flamecoach2.json';
import oddy_de from './locales/de/pages/oddy.json';
import oddy_en from './locales/en/pages/oddy.json';

const translations = {
  de: {
    home: home_de,
    about: about_de,
    homeselection: homeselection_de,
    basePage: basePage_de,
    aufwind: aufwind_de,
    essen1887: essen1887_de,
    flamecoach: flamecoach_de,
    flamecoach2: flamecoach2_de,
    oddy: oddy_de,
  },
  en: {
    home: home_en,
    about: about_en,
    homeselection: homeselection_en,
    basePage: basePage_en,
    aufwind: aufwind_en,
    essen1887: essen1887_en,
    flamecoach: flamecoach_en,
    flamecoach2: flamecoach2_en,
    oddy: oddy_en,
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('de');

  const t = (section, key) =>
    translations[language][section]?.[key] || `${section}.${key}`;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
