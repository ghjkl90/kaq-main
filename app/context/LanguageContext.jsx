// app/context/LanguageContext.jsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  currentLang: 'KR',
  changeLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState('KR');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('kaq_lang');
      if (savedLang && ['KR', 'EN', 'JP', 'TH'].includes(savedLang)) {
        setCurrentLang(savedLang);
      }
    } catch (e) {
      console.warn('LocalStorage access error:', e);
    }
    setIsInitialized(true);
  }, []);

  const changeLanguage = (lang) => {
    if (!['KR', 'EN', 'JP', 'TH'].includes(lang)) return;
    setCurrentLang(lang);
    try {
      localStorage.setItem('kaq_lang', lang);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage, isInitialized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}