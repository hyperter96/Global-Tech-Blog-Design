import React, { useEffect, useState, createContext } from 'react';
import { zhTranslations } from '../locales/zh';
import { enTranslations } from '../locales/en';
type Language = 'zh' | 'en';
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: {
    zh: typeof zhTranslations;
    en: typeof enTranslations;
  };
}
export const LanguageContext = createContext<LanguageContextType>({
  language: 'zh',
  setLanguage: () => {},
  translations: {
    zh: zhTranslations,
    en: enTranslations
  }
});
interface LanguageProviderProps {
  children: ReactNode;
}
export function LanguageProvider({
  children
}: LanguageProviderProps) {
  // Check if user has a preference in localStorage or browser language
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('language');
      if (storedPrefs === 'zh' || storedPrefs === 'en') {
        return storedPrefs;
      }
      // Check browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('zh')) {
        return 'zh';
      }
    }
    return 'zh'; // Default language
  };
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  const translations = {
    zh: zhTranslations,
    en: enTranslations
  };
  return <LanguageContext.Provider value={{
    language,
    setLanguage,
    translations
  }}>
      {children}
    </LanguageContext.Provider>;
}