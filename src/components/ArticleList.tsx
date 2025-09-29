import React, { useState } from 'react';
import { ArticleCard } from './ArticleCard';
import { ListFilterIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// Sample articles data
const articles = [{
  id: 1,
  title: '2023年跨境电商最新趋势分析',
  summary: '随着全球电子商务的持续增长，本文分析了2023年跨境电商的最新趋势和机遇，帮助卖家制定有效策略。',
  category: '跨境电商',
  date: '2023-06-15',
  readTime: '8分钟',
  author: '李明',
  image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-blue-100 text-blue-800'
}, {
  id: 2,
  title: '独立站SEO优化完全指南',
  summary: '本文提供了一套完整的独立站SEO优化策略，从关键词研究到技术优化，帮助您提升网站在搜索引擎中的排名。',
  category: '独立站',
  date: '2023-05-28',
  readTime: '12分钟',
  author: '张华',
  image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-green-100 text-green-800'
}, {
  id: 3,
  title: '海外社交媒体营销策略',
  summary: '探索如何利用Facebook、Instagram和TikTok等平台进行有效的海外营销，提高品牌知名度和销售转化率。',
  category: '海外营销',
  date: '2023-05-10',
  readTime: '10分钟',
  author: '王芳',
  image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-purple-100 text-purple-800'
}, {
  id: 4,
  title: 'React性能优化技巧',
  summary: '深入探讨React应用性能优化的实用技巧，从组件渲染到状态管理，全方位提升应用响应速度。',
  category: '技术教程',
  date: '2023-04-22',
  readTime: '15分钟',
  author: '陈强',
  image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-cyan-100 text-cyan-800'
}, {
  id: 5,
  title: '跨境物流解决方案对比',
  summary: '对比分析各大跨境物流方案的优缺点、成本和时效，帮助卖家选择最适合自己业务的物流解决方案。',
  category: '跨境电商',
  date: '2023-04-05',
  readTime: '9分钟',
  author: '赵明',
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-blue-100 text-blue-800'
}, {
  id: 6,
  title: '数据分析工具在独立站中的应用',
  summary: '探讨如何利用Google Analytics、Hotjar等数据分析工具优化独立站用户体验和转化率。',
  category: '独立站',
  date: '2023-03-18',
  readTime: '11分钟',
  author: '林小华',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-green-100 text-green-800'
}, {
  id: 7,
  title: 'TikTok广告投放技巧',
  summary: '详解如何在TikTok平台上进行有效的广告投放，把握年轻用户群体，提升品牌曝光度。',
  category: '海外营销',
  date: '2023-03-05',
  readTime: '13分钟',
  author: '刘佳',
  image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-purple-100 text-purple-800'
}, {
  id: 8,
  title: 'TypeScript高级应用实践',
  summary: '探索TypeScript在大型前端项目中的高级应用技巧，提高代码质量和开发效率。',
  category: '技术教程',
  date: '2023-02-20',
  readTime: '16分钟',
  author: '张伟',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-cyan-100 text-cyan-800'
}, {
  id: 9,
  title: '跨境电商品牌建设策略',
  summary: '如何在全球市场中打造强大的品牌影响力，从产品定位到视觉识别系统的全方位解析。',
  category: '跨境电商',
  date: '2023-02-08',
  readTime: '10分钟',
  author: '王明',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-blue-100 text-blue-800'
}, {
  id: 10,
  title: 'Shopify主题开发指南',
  summary: '从零开始学习如何为Shopify独立站开发自定义主题，满足特定行业和品牌的独特需求。',
  category: '独立站',
  date: '2023-01-25',
  readTime: '14分钟',
  author: '李强',
  image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-green-100 text-green-800'
}, {
  id: 11,
  title: 'Pinterest营销完全指南',
  summary: '如何利用Pinterest这一视觉搜索平台进行有效的内容营销，吸引目标客户并提高转化率。',
  category: '海外营销',
  date: '2023-01-12',
  readTime: '9分钟',
  author: '张丽',
  image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-purple-100 text-purple-800'
}, {
  id: 12,
  title: 'NextJS与React优化技巧',
  summary: '使用NextJS和React构建高性能Web应用的最佳实践和优化技巧，提升用户体验。',
  category: '技术教程',
  date: '2022-12-28',
  readTime: '12分钟',
  author: '陈杰',
  image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
  categoryColor: 'bg-cyan-100 text-cyan-800'
}];
export function ArticleList() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  // Filter articles based on active category
  const filteredArticles = activeCategory ? articles.filter(article => article.category === activeCategory) : articles;
  // Sort articles based on sortBy
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    // For demo purposes, we're just using the article ID as a proxy for popularity
    return a.id - b.id;
  });
  // Get unique categories
  const categories = Array.from(new Set(articles.map(article => article.category)));
  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  // Page change handlers
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 sm:mb-0">
          最新文章
        </h2>
        <div className="flex flex-wrap gap-2">
          <div className="relative inline-block">
            <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={sortBy} onChange={e => {
            setSortBy(e.target.value as 'latest' | 'popular');
            setCurrentPage(1); // Reset to first page on sort change
          }}>
              <option value="latest">最新</option>
              <option value="popular">最热</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
              <ListFilterIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === null ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} onClick={() => {
        setActiveCategory(null);
        setCurrentPage(1); // Reset to first page on category change
      }}>
          全部
        </button>
        {categories.map(category => <button key={category} className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === category ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} onClick={() => {
        setActiveCategory(category);
        setCurrentPage(1); // Reset to first page on category change
      }}>
            {category}
          </button>)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentArticles.map(article => <ArticleCard key={article.id} title={article.title} summary={article.summary} category={article.category} date={article.date} readTime={article.readTime} author={article.author} image={article.image} categoryColor={article.categoryColor} />)}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && <div className="flex justify-center mt-10">
          <nav className="flex items-center space-x-2">
            <button onClick={goToPrevPage} disabled={currentPage === 1} className={`p-2 rounded-md ${currentPage === 1 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-100'}`}>
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            {/* Page Numbers */}
            <div className="flex space-x-1">
              {Array.from({
            length: totalPages
          }, (_, i) => i + 1).map(pageNumber => <button key={pageNumber} onClick={() => goToPage(pageNumber)} className={`px-3 py-1 rounded-md ${currentPage === pageNumber ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                  {pageNumber}
                </button>)}
            </div>
            <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`p-2 rounded-md ${currentPage === totalPages ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-100'}`}>
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </nav>
        </div>}
    </div>;
}