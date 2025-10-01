import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { LazyImage } from '../components/LazyImage';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, FolderIcon, CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import { getArticlesByCategory, type ArticleMetadata } from '../utils/articleManager';
import { FlameIcon } from '../components/FlameIcon';

// 分类信息映射（与Categories页面保持一致）
const categoryInfo: { [key: string]: { name: string; description: string; color: string; image: string } } = {
  '1': {
    name: '跨境电商',
    description: '跨境电商平台、政策、趋势及运营策略的深度分析与实用指南',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80'
  },
  '2': {
    name: '独立站运营',
    description: 'Shopify、WooCommerce等独立站搭建、优化与营销的全方位指导',
    color: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80'
  },
  '3': {
    name: '海外营销',
    description: '针对不同国家市场的营销策略、社交媒体运营与广告投放技巧',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80'
  },
  '4': {
    name: '技术教程',
    description: '前端、后端、移动应用开发等技术教程，帮助提升开发效率与质量',
    color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800/30 dark:text-cyan-300',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80'
  },
  '5': {
    name: '数据分析',
    description: '电商数据分析方法、工具使用与实战案例分享',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80'
  },
  '6': {
    name: '支付物流',
    description: '跨境电商支付解决方案与全球物流策略优化',
    color: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80'
  }
};

// Function to convert category colors for dark mode compatibility
const getCategoryColorForDarkMode = (originalColor: string) => {
  const colorMap: { [key: string]: string } = {
    'bg-green-100 text-green-800': 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300',
    'bg-blue-100 text-blue-800': 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300',
    'bg-purple-100 text-purple-800': 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300',
    'bg-orange-100 text-orange-800': 'bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-300',
    'bg-red-100 text-red-800': 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300',
    'bg-yellow-100 text-yellow-800': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300',
    'bg-indigo-100 text-indigo-800': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300',
    'bg-pink-100 text-pink-800': 'bg-pink-100 text-pink-800 dark:bg-pink-800/30 dark:text-pink-300',
    'bg-teal-100 text-teal-800': 'bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-300',
    'bg-cyan-100 text-cyan-800': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800/30 dark:text-cyan-300'
  };
  
  return colorMap[originalColor] || `${originalColor} dark:bg-slate-600 dark:text-slate-300`;
};

export function CategoryArticles() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [categoryData, setCategoryData] = useState<{ name: string; description: string; color: string; image: string } | null>(null);

  useEffect(() => {
    const loadCategoryArticles = async () => {
      if (!categoryId) {
        navigate('/categories');
        return;
      }

      try {
        const info = categoryInfo[categoryId];
        if (!info) {
          navigate('/categories');
          return;
        }
        
        setCategoryData(info);
        const categoryArticles = await getArticlesByCategory(info.name);
        // 按热度优先排序，然后按时间排序
        const sortedArticles = categoryArticles.sort((a, b) => {
          // 首先按热度排序：热度高的文章优先
          if (a.isHot && !b.isHot) return -1;  // a是热门，b不是，a排前面
          if (!a.isHot && b.isHot) return 1;   // b是热门，a不是，b排前面
          
          // 如果两篇文章热度相同（都是热门或都不是热门），则按时间排序
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setArticles(sortedArticles);
      } catch (error) {
        console.error('Error loading category articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryArticles();
  }, [categoryId, navigate]);

  const goBack = () => {
    navigate('/categories');
  };

  if (!categoryData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-grow">
        {/* 分类头部横幅 */}
        <div className={`relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-700 transition-all duration-700 ${
          imageLoaded ? 'opacity-100' : 'opacity-90'
        }`}>
          {/* 背景图片 */}
          <div className="absolute inset-0">
            {/* 加载动画骨架 */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-cover-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/20 animate-shimmer"></div>
                {/* 添加一些装饰性的加载指示器 */}
                <div className="absolute top-4 left-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 实际图片 */}
            <img
              src={categoryData.image}
              alt={categoryData.name}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true); // 即使错误也要显示内容
              }}
            />
            
            {/* 如果图片加载失败显示默认背景 */}
            {imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800 flex items-center justify-center">
                <div className="text-white/50 text-center">
                  <FolderIcon className="w-16 h-16 mx-auto mb-2" />
                  <p className="text-sm">图片加载失败</p>
                </div>
              </div>
            )}
          </div>
          
          {/* 遮罩层 */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* 内容层 */}
          <div className="relative container mx-auto px-4 h-full flex items-center z-10">
            <div className={`text-white transition-all duration-700 ${
              imageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-70 transform translate-y-2'
            }`}>
              <button
                type="button"
                onClick={goBack}
                className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                返回分类页面
              </button>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryData.color}`}>
                <FolderIcon className="inline-block w-3 h-3 mr-1" />
                {categoryData.name}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryData.name}</h1>
              <p className="text-lg text-white/90 max-w-2xl">{categoryData.description}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-slate-500 dark:text-slate-400">正在加载文章...</div>
            </div>
          ) : articles.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  共找到 {articles.length} 篇文章
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                  <Link 
                    key={article.id} 
                    to={`/article/${article.id}`}
                    className="block bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <div className="transform transition-transform duration-500 group-hover:scale-110">
                        <LazyImage 
                          src={article.image || '/placeholder-image.jpg'} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                          aspectRatio="aspect-video"
                        />
                      </div>
                      {/* 悬停遮罩层 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {article.isHot && (
                        <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg animate-pulse">
                          <FlameIcon size={16} className="drop-shadow-sm" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 transition-transform duration-300 group-hover:scale-105 ${getCategoryColorForDarkMode(article.categoryColor)}`}>
                        {article.category}
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      
                      {/* 文章元信息 */}
                      <div className="flex flex-wrap items-center text-xs text-slate-500 dark:text-slate-400 mb-3 space-x-4">
                        <div className="flex items-center">
                          <UserIcon className="w-3 h-3 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          {article.date}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      
                      {/* 文章标签 */}
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index}
                            className="inline-block px-2 py-1 rounded text-xs bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="inline-block px-2 py-1 rounded text-xs bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <FolderIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                暂无文章
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                分类 "{categoryData.name}" 下暂时还没有文章
              </p>
              <button
                type="button"
                onClick={goBack}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
              >
                返回分类页面
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}