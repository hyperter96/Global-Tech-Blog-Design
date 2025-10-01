import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };
  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };
  if (!isVisible) return null;
  return <>
      {/* 透明遮罩层 - 点击可关闭 */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm cursor-pointer animate-fade-in" 
        onClick={() => setIsVisible(false)}
        aria-label="关闭 Cookie 横幅"
      ></div>
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md cookie-banner-shadow border-t border-slate-200 dark:border-slate-700 animate-slide-up">
        <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                我们使用 Cookie
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              我们使用必要的 Cookie 来确保网站正常运行。我们还使用分析 Cookie
              来改善您的体验。 点击"接受所有 Cookie"即表示您同意使用所有 Cookie。
              您可以通过点击"Cookie 设置"了解更多信息或调整您的偏好。 查看我们的{' '}
              <Link to="/cookie-policy" className="text-blue-900 dark:text-blue-400 hover:underline font-medium">
                Cookie 政策
              </Link>{' '}
              获取更多详情。
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 min-w-0 lg:min-w-fit">
            <button 
              onClick={declineCookies} 
              className="px-6 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 text-sm font-medium transition-all duration-200 hover:shadow-sm"
            >
              仅必要 Cookie
            </button>
            <button 
              onClick={acceptCookies} 
              className="px-6 py-2.5 bg-gradient-to-r from-blue-900 to-blue-800 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
            >
              接受所有 Cookie
            </button>
            <button 
              onClick={() => setIsVisible(false)} 
              className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="关闭 Cookie 横幅"
            >
              <XIcon className="h-4 w-4" />
            </button>
            {/* 移动端关闭按钮 */}
            <button 
              onClick={() => setIsVisible(false)} 
              className="absolute top-2 right-2 sm:hidden text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label="关闭 Cookie 横幅"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>;
}