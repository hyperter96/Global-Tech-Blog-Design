import { useState, useEffect } from 'react';
import { GithubIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllTags, getAllArticlesMetadata, type TagData, type ArticleMetadata } from '../utils/articleManager';
import { Newsletter } from './Newsletter';

export function Sidebar() {
  // Dynamic tags data
  const [tags, setTags] = useState<TagData[]>([]);
  // Hot articles data
  const [allHotArticles, setAllHotArticles] = useState<ArticleMetadata[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3; // 每页显示3篇文章

  useEffect(() => {
    const loadData = async () => {
      try {
        // 加载标签数据
        const allTags = await getAllTags();
        setTags(allTags.slice(0, 10)); // 只显示前10个最热门的标签
        
        // 加载热门文章数据
        const allArticles = await getAllArticlesMetadata();
        const hotArticlesList = allArticles
          .filter(article => article.isHot) // 过滤出热门文章
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 按时间排序
        setAllHotArticles(hotArticlesList);
      } catch (error) {
        console.error('Error loading sidebar data:', error);
      }
    };

    loadData();
  }, []);

  // 分页计算
  const totalPages = Math.ceil(allHotArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentHotArticles = allHotArticles.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return <aside className="space-y-8">
      {/* About Author */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src="/selfie.jpeg" 
            alt="Peter Leow" 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Peter Leow</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">跨境电商顾问 & 技术极客</p>
          </div>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          5年跨境电商和技术开发经验，专注于帮助企业拓展全球市场，优化运营流程。
        </p>
        <div className="flex space-x-2">
          <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-400">
            {/* X (Twitter) Icon */}
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://t.me/hyperteligent" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-400">
            {/* Telegram Icon */}
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
          <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-400">
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
      {/* Newsletter Subscription */}
      <Newsletter />
      {/* Popular Posts */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4">热门文章</h3>
        <div className="space-y-1" style={{ minHeight: `${articlesPerPage * 40}px` }}>
          {currentHotArticles.length > 0 ? (
            <>
              {currentHotArticles.map(article => (
                <div key={article.id} className="flex items-center gap-3 min-h-[36px]">
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <div className="flex items-center justify-between gap-3 flex-1 min-w-0">
                    <Link 
                      to={`/article/${article.id}`}
                      className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 text-sm font-medium leading-tight flex-1 line-clamp-2"
                      title={article.title}
                    >
                      {article.title}
                    </Link>
                    <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap flex-shrink-0">
                      {new Date(article.date).toLocaleDateString('zh-CN', { 
                        year: 'numeric',
                        month: '2-digit', 
                        day: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {/* 添加占位符以保持高度一致 */}
              {Array.from({ length: articlesPerPage - currentHotArticles.length }, (_, i) => (
                <div key={`placeholder-${i}`} className="min-h-[36px]"></div>
              ))}
            </>
          ) : allHotArticles.length === 0 ? (
            <div className="flex items-center justify-center" style={{ minHeight: `${articlesPerPage * 40}px` }}>
              <p className="text-slate-500 dark:text-slate-400 text-sm">正在加载热门文章...</p>
            </div>
          ) : null}
        </div>
        
        {/* 分页控件 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-slate-500 dark:disabled:hover:text-slate-400"
            >
              ← 上一页
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-6 h-6 text-xs rounded-full transition-colors ${
                    currentPage === page
                      ? 'bg-orange-500 text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-slate-500 dark:disabled:hover:text-slate-400"
            >
              下一页 →
            </button>
          </div>
        )}
      </div>
      {/* Tags */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4">标签云</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => 
            <Link 
              key={tag.name} 
              to={`/tags?tag=${encodeURIComponent(tag.name)}`}
              className="px-3 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 rounded-full text-xs transition-colors"
            >
              {tag.name} ({tag.count})
            </Link>
          )}
        </div>
        {tags.length === 0 && (
          <p className="text-slate-500 dark:text-slate-400 text-sm">正在加载标签...</p>
        )}
      </div>
    </aside>;
}