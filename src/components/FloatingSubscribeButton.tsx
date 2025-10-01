import { useState, useContext, useEffect, FormEvent } from 'react';
import { Mail, X, CheckCircle, ArrowUp } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';

export function FloatingSubscribeButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const { language } = useContext(LanguageContext);

  // 监听滚动，当用户滚动到一定位置时显示按钮
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // 当滚动超过一个视口高度时显示
      setIsVisible(scrollTop > windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      return;
    }

    setStatus('loading');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      }
      
      setStatus('success');
      setEmail('');
      
      // 2秒后收起
      setTimeout(() => {
        setIsExpanded(false);
        setStatus('idle');
      }, 2000);
      
    } catch {
      setStatus('idle');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* 回到顶部按钮 */}
      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-slate-700 hover:bg-slate-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
        title={language === 'zh' ? '回到顶部' : 'Back to top'}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* 订阅按钮 */}
      <div className={`transition-all duration-300 ${isExpanded ? 'w-80' : 'w-auto'}`}>
        {isExpanded ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                {language === 'zh' ? '快速订阅' : 'Quick Subscribe'}
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>
            
            {status === 'success' ? (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 py-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {language === 'zh' ? '订阅成功！' : 'Subscribed!'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'zh' ? '输入邮箱地址' : 'Enter email'}
                  disabled={status === 'loading'}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 dark:text-slate-300 placeholder-slate-400 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || !email.trim()}
                  className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{language === 'zh' ? '订阅中...' : 'Subscribing...'}</span>
                    </>
                  ) : (
                    <>
                      <Mail className="h-3 w-3" />
                      <span>{language === 'zh' ? '订阅' : 'Subscribe'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-105 group"
          >
            <Mail className="h-5 w-5" />
            <span className="font-medium text-sm">
              {language === 'zh' ? '订阅更新' : 'Subscribe'}
            </span>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          </button>
        )}
      </div>
    </div>
  );
}