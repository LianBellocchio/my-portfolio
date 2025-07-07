import React, { createContext, useState, useContext } from 'react';
import { en } from '../locales/en';
import { es } from '../locales/es';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language

  const translations = {
    en,
    es,
  };

  const t = (key) => {
    const keys = key.split('.');
    let text = translations[language];
    for (const k of keys) {
      if (text && text[k] !== undefined) {
        text = text[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    return text;
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'es' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);