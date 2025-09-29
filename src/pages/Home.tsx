import React from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { ArticleList } from '../components/ArticleList';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
export function Home() {
  return <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <ArticleList />
          </div>
          <div className="w-full lg:w-1/3">
            <Sidebar />
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>;
}