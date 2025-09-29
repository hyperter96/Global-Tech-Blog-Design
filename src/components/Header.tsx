import React, { useState, useContext } from 'react';
import { SearchIcon, MenuIcon, XIcon, SunIcon, MoonIcon, GlobeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    theme,
    toggleTheme
  } = useContext(ThemeContext);
  const {
    language,
    setLanguage,
    translations
  } = useContext(LanguageContext);
  const t = translations[language];
  return <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-900 dark:text-blue-400">
              HyperTeligent
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 font-medium">
              {t.nav.home}
            </Link>
            <Link to="/categories" className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 font-medium">
              {t.nav.categories}
            </Link>
            <Link to="/tags" className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 font-medium">
              {t.nav.tags}
            </Link>
            <Link to="/about" className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 font-medium">
              {t.nav.about}
            </Link>
            <Link to="/contact" className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 font-medium">
              {t.nav.contact}
            </Link>
          </nav>
          {/* Search Box, Theme Toggle, and Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder={t.search} className="pl-10 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            </div>
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700" aria-label={theme === 'dark' ? t.switchToLight : t.switchToDark}>
              {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            {/* Language Selector */}
            <div className="relative">
              <button className="flex items-center p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700" aria-label={t.switchLanguage}>
                <GlobeIcon className="h-5 w-5 mr-1" />
                <span className="text-sm">
                  {language === 'zh' ? '中' : 'EN'}
                </span>
              </button>
              <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button onClick={() => setLanguage('zh')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'zh' ? 'text-blue-900 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`} role="menuitem">
                    中文
                  </button>
                  <button onClick={() => setLanguage('en')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-blue-900 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`} role="menuitem">
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Toggle (Mobile) */}
            <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" aria-label={theme === 'dark' ? t.switchToLight : t.switchToDark}>
              {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>
            {/* Language Toggle (Mobile) */}
            <button onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" aria-label={t.switchLanguage}>
              <span className="text-sm font-medium">
                {language === 'zh' ? 'EN' : '中'}
              </span>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 focus:outline-none">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
              {t.nav.home}
            </Link>
            <Link to="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
              {t.nav.categories}
            </Link>
            <Link to="/tags" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
              {t.nav.tags}
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
              {t.nav.about}
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
              {t.nav.contact}
            </Link>
          </div>
          <div className="px-5 pb-3">
            <div className="relative">
              <input type="text" placeholder={t.search} className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            </div>
          </div>
        </div>}
    </header>;
}