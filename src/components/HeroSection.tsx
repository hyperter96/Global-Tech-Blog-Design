import { useContext, useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { SubscriptionModal } from './SubscriptionModal';

export function HeroSection() {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language];
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  return <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 md:py-24 bg-cover bg-center" style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
    backgroundBlendMode: 'overlay'
  }}>
      {/* 深蓝色透明遮罩 */}
      <div className="absolute inset-0 bg-blue-900/40 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 drop-shadow-md">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const articlesSection = document.querySelector('.articles-section');
                articlesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              {t.hero.latestArticles}
            </button>
            <button 
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-6 rounded-md transition-colors transform hover:scale-105"
            >
              {t.hero.subscribe}
            </button>
          </div>
        </div>
      </div>
      
      {/* 订阅弹窗 */}
      <SubscriptionModal 
        isOpen={isSubscriptionModalOpen} 
        onClose={() => setIsSubscriptionModalOpen(false)} 
      />
    </section>;
}