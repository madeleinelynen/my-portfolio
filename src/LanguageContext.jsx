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
import oddyVR_de from './locales/de/pages/oddyVR.json';
import oddyVR_en from './locales/en/pages/oddyVR.json';
import schumannVR_de from './locales/de/pages/schumannVR.json';
import schumannVR_en from './locales/en/pages/schumannVR.json';
import softRevision_de from './locales/de/pages/softRevision.json';
import softRevision_en from './locales/en/pages/softRevision.json';
import terraInfra_de from './locales/de/pages/terraInfra.json';
import terraInfra_en from './locales/en/pages/terraInfra.json';
import trikottaufe_de from './locales/de/pages/trikottaufe.json';
import trikottaufe_en from './locales/en/pages/trikottaufe.json';
import vodafone5GCar_de from './locales/de/pages/vodafone5GCar.json';
import vodafone5GCar_en from './locales/en/pages/vodafone5GCar.json';
import vodafoneOMR_de from './locales/de/pages/vodafoneOMR.json';
import vodafoneOMR_en from './locales/en/pages/vodafoneOMR.json';

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
    oddyVR: oddyVR_de,
    schumannVR: schumannVR_de,
    softRevision: softRevision_de,
    terraInfra: terraInfra_de,
    trikottaufe: trikottaufe_de,
    vodafone5GCar: vodafone5GCar_de,
    vodafoneOMR: vodafoneOMR_de,
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
    oddyVR: oddyVR_en,
    schumannVR: schumannVR_en,
    softRevision: softRevision_en,
    terraInfra: terraInfra_en,
    trikottaufe: trikottaufe_en,
    vodafone5GCar: vodafone5GCar_en,
    vodafoneOMR: vodafoneOMR_en,
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
