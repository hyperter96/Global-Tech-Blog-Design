import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { ArticleList } from '../components/ArticleList';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { InlineNewsletter } from '../components/InlineNewsletter';
import { FloatingSubscribeButton } from '../components/FloatingSubscribeButton';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 articles-section">
            <ArticleList />
          </div>
          <div className="w-full lg:w-1/3">
            <Sidebar />
          </div>
        </div>
        
        {/* 内联订阅组件 */}
        <InlineNewsletter />
      </main>
      <Footer />
      <CookieBanner />
      
      {/* 浮动订阅按钮 */}
      <FloatingSubscribeButton />
    </div>
  );
}