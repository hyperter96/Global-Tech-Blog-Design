import { useState, useEffect } from 'react';
import { ArticleCard } from './ArticleCard';
import { ListFilterIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { getAllArticlesMetadata, type ArticleMetadata } from '../utils/articleManager';
export function ArticleList() {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const articlesData = await getAllArticlesMetadata();
        setArticles(articlesData);
      } catch (error) {
        console.error('Failed to load articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);
  // Filter articles based on active category
  const filteredArticles = activeCategory ? articles.filter(article => article.category === activeCategory) : articles;
  // Sort articles based on sortBy
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'popular') {
      // 最热排序：首先按热度排序，热度高的文章优先
      if (a.isHot && !b.isHot) return -1;  // a是热门，b不是，a排前面
      if (!a.isHot && b.isHot) return 1;   // b是热门，a不是，b排前面
      
      // 如果两篇文章热度相同（都是热门或都不是热门），则按时间排序
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'latest') {
      // 最新排序：只按时间排序，不考虑热度
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
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
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 dark:border-blue-400"></div>
      </div>
    );
  }

  return <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 sm:mb-0">
          {sortBy === 'popular' ? '热门文章' : '最新文章'}
        </h2>
        <div className="flex flex-wrap gap-2">
          <div className="relative inline-block">
            <select className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={sortBy} onChange={e => {
            setSortBy(e.target.value as 'latest' | 'popular');
            setCurrentPage(1); // Reset to first page on sort change
          }}>
              <option value="latest">最新</option>
              <option value="popular">最热</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
              <ListFilterIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === null ? 'bg-blue-900 dark:bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`} onClick={() => {
        setActiveCategory(null);
        setCurrentPage(1); // Reset to first page on category change
      }}>
          全部
        </button>
        {categories.map(category => <button key={category} className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === category ? 'bg-blue-900 dark:bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`} onClick={() => {
        setActiveCategory(category);
        setCurrentPage(1); // Reset to first page on category change
      }}>
            {category}
          </button>)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentArticles.map(article => <ArticleCard key={article.id} id={article.id} title={article.title} summary={article.summary} category={article.category} date={article.date} readTime={article.readTime} author={article.author} image={article.image} categoryColor={article.categoryColor} isHot={article.isHot} />)}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && <div className="flex justify-center mt-10">
          <nav className="flex items-center space-x-2">
            <button onClick={goToPrevPage} disabled={currentPage === 1} className={`p-2 rounded-md ${currentPage === 1 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            {/* Page Numbers */}
            <div className="flex space-x-1">
              {Array.from({
            length: totalPages
          }, (_, i) => i + 1).map(pageNumber => <button key={pageNumber} onClick={() => goToPage(pageNumber)} className={`px-3 py-1 rounded-md ${currentPage === pageNumber ? 'bg-blue-900 dark:bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                  {pageNumber}
                </button>)}
            </div>
            <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`p-2 rounded-md ${currentPage === totalPages ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </nav>
        </div>}
    </div>;
}