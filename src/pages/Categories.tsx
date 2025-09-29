import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { Link } from 'react-router-dom';
// Sample categories data
const categories = [{
  id: 1,
  name: '跨境电商',
  description: '跨境电商平台、政策、趋势及运营策略的深度分析与实用指南',
  count: 24,
  image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
  color: 'bg-blue-100 text-blue-800',
  hoverColor: 'hover:bg-blue-200'
}, {
  id: 2,
  name: '独立站',
  description: 'Shopify、WooCommerce等独立站搭建、优化与营销的全方位指导',
  count: 18,
  image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
  color: 'bg-green-100 text-green-800',
  hoverColor: 'hover:bg-green-200'
}, {
  id: 3,
  name: '海外营销',
  description: '针对不同国家市场的营销策略、社交媒体运营与广告投放技巧',
  count: 15,
  image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
  color: 'bg-purple-100 text-purple-800',
  hoverColor: 'hover:bg-purple-200'
}, {
  id: 4,
  name: '技术教程',
  description: '前端、后端、移动应用开发等技术教程，帮助提升开发效率与质量',
  count: 12,
  image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
  color: 'bg-cyan-100 text-cyan-800',
  hoverColor: 'hover:bg-cyan-200'
}, {
  id: 5,
  name: '数据分析',
  description: '电商数据分析方法、工具使用与实战案例分享',
  count: 10,
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
  color: 'bg-amber-100 text-amber-800',
  hoverColor: 'hover:bg-amber-200'
}, {
  id: 6,
  name: '支付物流',
  description: '跨境电商支付解决方案与全球物流策略优化',
  count: 8,
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
  color: 'bg-red-100 text-red-800',
  hoverColor: 'hover:bg-red-200'
}];
export function Categories() {
  return <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">文章分类</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${category.color}`}>
                    {category.name}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      {category.count} 篇文章
                    </span>
                    <Link to={`/categories/${category.id}`} className={`text-blue-900 ${category.hoverColor} px-4 py-2 rounded-md font-medium text-sm transition-colors`}>
                      浏览文章
                    </Link>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>;
}