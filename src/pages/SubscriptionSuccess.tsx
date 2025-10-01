import { useContext, useEffect, useState } from 'react';
import { CheckCircle, Mail, ArrowRight, BookOpen, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

export function SubscriptionSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    // 5秒后隐藏动画
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 背景装饰 */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-150"></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-32 right-16 w-5 h-5 bg-yellow-400 rounded-full animate-bounce delay-500"></div>
        </div>
      )}

      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-green-100 dark:border-slate-700">
          {/* 成功图标 */}
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-200"></div>
          </div>

          {/* 主要内容 */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            {language === 'zh' ? '🎉 订阅成功！' : '🎉 Successfully Subscribed!'}
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            {language === 'zh' 
              ? '感谢您加入我们的跨境电商社区！您将第一时间收到最新的市场洞察和实战策略。'
              : 'Thank you for joining our cross-border e-commerce community! You\'ll be the first to receive the latest market insights and actionable strategies.'
            }
          </p>

          {/* 期待内容预览 */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {language === 'zh' ? '市场趋势' : 'Market Trends'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {language === 'zh' ? '每周市场分析报告' : 'Weekly market analysis reports'}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800">
              <BookOpen className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {language === 'zh' ? '实战指南' : 'Practical Guides'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {language === 'zh' ? '详细的操作教程' : 'Detailed operation tutorials'}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800">
              <Users className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {language === 'zh' ? '社区资源' : 'Community Resources'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {language === 'zh' ? '专属工具和模板' : 'Exclusive tools and templates'}
              </p>
            </div>
          </div>

          {/* 下一步行动 */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 mb-8">
            <Mail className="h-6 w-6 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              {language === 'zh' ? '接下来？' : 'What\'s Next?'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {language === 'zh' 
                ? '请检查您的邮箱（包括垃圾邮件文件夹），确认订阅并获取第一份资料。'
                : 'Please check your email (including spam folder) to confirm your subscription and get your first resource.'
              }
            </p>
          </div>

          {/* 行动按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <span>{language === 'zh' ? '继续浏览文章' : 'Continue Reading Articles'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link
              to="/categories"
              className="px-6 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>{language === 'zh' ? '浏览分类' : 'Browse Categories'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}