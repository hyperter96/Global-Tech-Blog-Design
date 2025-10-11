import { useState, useContext, useEffect } from 'react';
import { SearchIcon, MenuIcon, XIcon, SunIcon, MoonIcon, GlobeIcon, ChevronDownIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  
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

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // 清理函数
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <header className={`sticky top-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg' 
      : 'bg-white dark:bg-slate-900 shadow-sm'
  }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-900 dark:text-blue-400">
              <img src="/logo.svg" alt={t.brand.fullName} className="h-8 w-8" />
              <span className="hidden sm:inline">{t.brand.name}</span>
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
            {/* Tools Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 font-medium"
              >
                工具
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              {/* Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                isToolsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="py-1" role="menu">
                  <Link
                    to="/tools/free-proxy"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-900 dark:hover:text-blue-400"
                    role="menuitem"
                  >
                    免费代理
                  </Link>
                  <Link
                    to="/tools/ipv6-address"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-900 dark:hover:text-blue-400"
                    role="menuitem"
                  >
                    IPv6地址
                  </Link>
                </div>
              </div>
            </div>
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
            <button type="button" onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700" aria-label={theme === 'dark' ? t.switchToLight : t.switchToDark}>
              {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            {/* Language Selector */}
            <div className="relative">
              <button type="button" className="flex items-center p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700" aria-label={t.switchLanguage}>
                <GlobeIcon className="h-5 w-5 mr-1" />
                <span className="text-sm">
                  {language === 'zh' ? '中' : 'EN'}
                </span>
              </button>
              <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button type="button" onClick={() => setLanguage('zh')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'zh' ? 'text-blue-900 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`} role="menuitem">
                    中文
                  </button>
                  <button type="button" onClick={() => setLanguage('en')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-blue-900 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`} role="menuitem">
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Toggle (Mobile) */}
            <button type="button" onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" aria-label={theme === 'dark' ? t.switchToLight : t.switchToDark}>
              {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>
            {/* Language Toggle (Mobile) */}
            <button type="button" onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" aria-label={t.switchLanguage}>
              <span className="text-sm font-medium">
                {language === 'zh' ? 'EN' : '中'}
              </span>
            </button>
            <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 focus:outline-none">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && <div className={`md:hidden border-t border-slate-100 dark:border-slate-800 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md' 
          : 'bg-white dark:bg-slate-900'
      }`}>
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
            {/* Mobile Tools Menu */}
            <div>
              <div className="px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-300">
                工具
              </div>
              <Link to="/tools/free-proxy" className="block pl-6 pr-3 py-2 rounded-md text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                免费代理
              </Link>
              <Link to="/tools/ipv6-address" className="block pl-6 pr-3 py-2 rounded-md text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                IPv6地址
              </Link>
            </div>
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