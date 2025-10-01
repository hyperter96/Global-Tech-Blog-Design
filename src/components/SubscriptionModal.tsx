import { useState, useContext, FormEvent, useEffect, useCallback } from 'react';
import { X, Mail, CheckCircle, AlertCircle, Globe, TrendingUp, Users } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { language } = useContext(LanguageContext);

  // 处理弹窗的打开和关闭动画
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // 短暂延迟后触发淡入动画
      setTimeout(() => setIsAnimating(true), 10);
    } else if (isVisible) {
      // 开始淡出动画
      setIsAnimating(false);
      // 动画结束后隐藏弹窗
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen, isVisible]);

  // 处理关闭弹窗
  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
      setStatus('idle');
      setMessage('');
      setEmail('');
    }, 300);
  }, [onClose]);

  // 按ESC键关闭弹窗
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscKey);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, handleClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setMessage(language === 'zh' ? '请输入有效的邮箱地址' : 'Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // 模拟API调用
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 保存到本地存储
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (subscribers.includes(email)) {
        setStatus('error');
        setMessage(language === 'zh' ? '该邮箱已经订阅过了' : 'This email is already subscribed');
        return;
      }
      
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      
      setStatus('success');
      setMessage(language === 'zh' ? '订阅成功！感谢您的关注' : 'Successfully subscribed! Thank you for your interest');
      setEmail('');
      
      // 3秒后自动关闭
      setTimeout(() => {
        handleClose();
      }, 3000);
      
    } catch {
      setStatus('error');
      setMessage(language === 'zh' ? '订阅失败，请稍后重试' : 'Subscription failed, please try again later');
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div 
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 ease-out ${
          isAnimating 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={handleClose}
            className={`absolute top-4 right-4 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 border border-transparent rounded-full transition-all duration-200 transform hover:scale-110 hover:rotate-90 hover:shadow-lg hover:shadow-red-500/20 group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95 cursor-pointer z-10 ${
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ 
              transitionDelay: '800ms' // 让关闭按钮在其他元素之后出现
            }}
            title={language === 'zh' ? '关闭弹窗 (ESC)' : 'Close modal (ESC)'}
            aria-label={language === 'zh' ? '关闭弹窗' : 'Close modal'}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClose();
              }
            }}
          >
            <X className="h-5 w-5 text-slate-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-all duration-200 group-hover:drop-shadow-sm" />
          </button>
          
          <div className={`flex items-center gap-3 mb-4 transition-all duration-500 delay-100 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <div className={`p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl transition-all duration-700 delay-200 ${
              isAnimating ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}>
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                {language === 'zh' ? '订阅我们的内容' : 'Subscribe to Our Content'}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {language === 'zh' ? '获取最新资讯和独家内容' : 'Get latest insights and exclusive content'}
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-1 gap-3">
            <div className={`flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg transition-all duration-500 delay-300 transform ${
              isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              <Globe className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                  {language === 'zh' ? '全球市场洞察' : 'Global Market Insights'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'zh' ? '跨境电商最新趋势分析' : 'Latest cross-border e-commerce trends'}
                </p>
              </div>
            </div>
            
            <div className={`flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg transition-all duration-500 delay-400 transform ${
              isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              <TrendingUp className="h-5 w-5 text-emerald-500 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                  {language === 'zh' ? '实战策略指南' : 'Practical Strategy Guides'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'zh' ? '可操作的营销和技术方案' : 'Actionable marketing and tech solutions'}
                </p>
              </div>
            </div>
            
            <div className={`flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg transition-all duration-500 delay-500 transform ${
              isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              <Users className="h-5 w-5 text-purple-500 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                  {language === 'zh' ? '专属社区资源' : 'Exclusive Community Resources'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'zh' ? '订阅者专享内容和工具' : 'Subscriber-only content and tools'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className={`p-6 pt-2 transition-all duration-500 delay-600 ${
          isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'zh' ? '输入您的邮箱地址' : 'Enter your email address'}
                disabled={status === 'loading'}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 dark:text-slate-300 placeholder-slate-400 disabled:opacity-50 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading' || !email.trim()}
              className="group w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-blue-500/25"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="animate-pulse">{language === 'zh' ? '订阅中...' : 'Subscribing...'}</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>{language === 'zh' ? '立即订阅' : 'Subscribe Now'}</span>
                </>
              )}
            </button>
          </form>

          {/* Status Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-xl flex items-center gap-2 text-sm transform transition-all duration-300 animate-in slide-in-from-top-2 ${
              status === 'success' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' 
                : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
            }`}>
              {status === 'success' ? (
                <CheckCircle className="h-4 w-4 flex-shrink-0 animate-pulse" />
              ) : (
                <AlertCircle className="h-4 w-4 flex-shrink-0 animate-bounce" />
              )}
              <span>{message}</span>
            </div>
          )}
          
          <p className={`mt-4 text-xs text-slate-500 dark:text-slate-400 text-center transition-all duration-500 delay-700 ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`}>
            {language === 'zh' 
              ? '我们承诺保护您的隐私，不会发送垃圾邮件' 
              : 'We promise to protect your privacy and never send spam'
            }
          </p>
        </div>
      </div>
    </div>
  );
}