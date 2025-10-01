import { useState, useContext, FormEvent } from 'react';
import { Mail, CheckCircle, AlertCircle, Sparkles, Zap, Target } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';

export function InlineNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const { language } = useContext(LanguageContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setMessage(language === 'zh' ? '请输入有效的邮箱地址' : 'Please enter a valid email address');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
      return;
    }

    setStatus('loading');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        setStatus('error');
        setMessage(language === 'zh' ? '该邮箱已经订阅过了' : 'This email is already subscribed');
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 3000);
        return;
      }
      
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      
      setStatus('success');
      setMessage(language === 'zh' ? '订阅成功！感谢您的关注' : 'Successfully subscribed! Thank you');
      setEmail('');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
      
    } catch {
      setStatus('error');
      setMessage(language === 'zh' ? '订阅失败，请稍后重试' : 'Subscription failed, please try again');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <section className="newsletter-section bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 py-16 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-cyan-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* 标题区域 */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-medium text-sm">
                {language === 'zh' ? '获取独家内容' : 'Get Exclusive Content'}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'zh' 
                ? '加入 10,000+ 跨境电商从业者' 
                : 'Join 10,000+ Cross-border E-commerce Professionals'
              }
            </h2>
            
            <p className="text-xl text-blue-100 mb-8">
              {language === 'zh'
                ? '每周获取最新的市场洞察、实战策略和行业趋势分析'
                : 'Get weekly market insights, actionable strategies, and industry trend analysis'
              }
            </p>
          </div>

          {/* 特色功能 */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Zap className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">
                {language === 'zh' ? '实时市场分析' : 'Real-time Market Analysis'}
              </h3>
              <p className="text-blue-100 text-sm">
                {language === 'zh' 
                  ? '第一时间获取全球电商平台政策变化和市场动态'
                  : 'Get instant updates on global e-commerce platform policy changes'
                }
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Target className="h-8 w-8 text-green-300 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">
                {language === 'zh' ? '精准营销策略' : 'Precision Marketing Strategies'}
              </h3>
              <p className="text-blue-100 text-sm">
                {language === 'zh' 
                  ? '基于数据驱动的营销方案和ROI优化技巧'
                  : 'Data-driven marketing solutions and ROI optimization techniques'
                }
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Mail className="h-8 w-8 text-purple-300 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">
                {language === 'zh' ? '专属资源库' : 'Exclusive Resource Library'}
              </h3>
              <p className="text-blue-100 text-sm">
                {language === 'zh' 
                  ? '访问订阅者专享的工具、模板和深度报告'
                  : 'Access subscriber-only tools, templates and in-depth reports'
                }
              </p>
            </div>
          </div>

          {/* 订阅表单 */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'zh' ? '输入您的邮箱地址' : 'Enter your email address'}
                  disabled={status === 'loading'}
                  className="flex-1 px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-slate-800 placeholder-slate-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || !email.trim()}
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>{language === 'zh' ? '订阅中...' : 'Subscribing...'}</span>
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      <span>{language === 'zh' ? '免费订阅' : 'Subscribe Free'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* 状态消息 */}
            {message && (
              <div className={`mt-4 p-3 rounded-xl flex items-center gap-2 text-sm ${
                status === 'success' 
                  ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                  : 'bg-red-500/20 text-red-100 border border-red-400/30'
              }`}>
                {status === 'success' ? (
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                )}
                <span>{message}</span>
              </div>
            )}
            
            <p className="mt-4 text-xs text-blue-200 text-center">
              {language === 'zh' 
                ? '免费订阅，随时可取消。我们承诺保护您的隐私。' 
                : 'Free subscription, cancel anytime. We promise to protect your privacy.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}