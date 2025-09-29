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
  return <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-slate-200">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 mb-4 md:mb-0 md:mr-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            我们使用 Cookie
          </h3>
          <p className="text-slate-600 text-sm">
            我们使用必要的 Cookie 来确保网站正常运行。我们还使用分析 Cookie
            来改善您的体验。 点击"接受所有 Cookie"即表示您同意使用所有 Cookie。
            您可以通过点击"Cookie 设置"了解更多信息或调整您的偏好。 查看我们的{' '}
            <Link to="/cookie-policy" className="text-blue-900 hover:underline">
              Cookie 政策
            </Link>{' '}
            获取更多详情。
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={declineCookies} className="px-5 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 text-sm font-medium">
            仅必要 Cookie
          </button>
          <button onClick={acceptCookies} className="px-5 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm font-medium">
            接受所有 Cookie
          </button>
          <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 md:hidden">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>;
}