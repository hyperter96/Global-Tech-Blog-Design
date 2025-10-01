import { useContext, useEffect, useState } from 'react';
import { Users, Mail, Globe, TrendingUp } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';

export function SubscriptionStats() {
  const [stats, setStats] = useState({
    subscribers: 0,
    articles: 0,
    countries: 0,
    growthRate: 0
  });
  
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    // 模拟数据加载和动画效果
    const animateNumbers = () => {
      const targetStats = {
        subscribers: 10247,
        articles: 156,
        countries: 45,
        growthRate: 23
      };

      // 动画持续时间
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setStats({
          subscribers: Math.floor(targetStats.subscribers * progress),
          articles: Math.floor(targetStats.articles * progress),
          countries: Math.floor(targetStats.countries * progress),
          growthRate: Math.floor(targetStats.growthRate * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(targetStats);
        }
      }, stepTime);

      return () => clearInterval(timer);
    };

    const cleanup = animateNumbers();
    return cleanup;
  }, []);

  const statsData = [
    {
      icon: Users,
      value: stats.subscribers.toLocaleString(),
      label: language === 'zh' ? '订阅用户' : 'Subscribers',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Mail,
      value: stats.articles.toString(),
      label: language === 'zh' ? '精品文章' : 'Quality Articles',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      icon: Globe,
      value: `${stats.countries}+`,
      label: language === 'zh' ? '覆盖国家' : 'Countries',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: TrendingUp,
      value: `${stats.growthRate}%`,
      label: language === 'zh' ? '月增长率' : 'Monthly Growth',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 text-center">
        {language === 'zh' ? '社区数据' : 'Community Stats'}
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-lg p-4 text-center transition-all duration-300 hover:scale-105`}
            >
              <div className={`inline-flex items-center justify-center w-8 h-8 ${stat.color} mb-2`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div className={`text-xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {language === 'zh' 
            ? '数据每日更新，加入我们的全球社区'
            : 'Data updated daily, join our global community'
          }
        </p>
      </div>
    </div>
  );
}