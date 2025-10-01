import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { LazyImage } from '../components/LazyImage';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, TagIcon, CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import { getAllTags, getArticlesByTag, type TagData, type ArticleMetadata } from '../utils/articleManager';
import { FlameIcon } from '../components/FlameIcon';
// Function to get font size based on tag count
const getFontSize = (count: number, allTags: TagData[]) => {
  if (allTags.length === 0) return 1;
  const min = Math.min(...allTags.map(tag => tag.count));
  const max = Math.max(...allTags.map(tag => tag.count));
  const range = max - min;
  if (range === 0) return 1.2; // All tags have same count
  const normalizedCount = (count - min) / range;
  return 0.75 + normalizedCount * 1.8; // Font size between 0.75rem and 2.55rem
};

// Function to get a color based on tag count with gradient effects
const getColor = (count: number) => {
  const colorClasses = [
    'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300', 
    'text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300', 
    'text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300', 
    'text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300', 
    'text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300', 
    'text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300', 
    'text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300', 
    'text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300',
    'text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300',
    'text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300'
  ];
  return colorClasses[count % colorClasses.length];
};

// Function to convert category colors for dark mode compatibility
const getCategoryColorForDarkMode = (originalColor: string) => {
  // Map original light mode colors to dark mode compatible colors
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
  
  // Return mapped color or fallback to original with default dark mode classes
  return colorMap[originalColor] || `${originalColor} dark:bg-slate-600 dark:text-slate-300`;
};

// Function to get cloud-like positioning
const getCloudPosition = (index: number, count: number) => {
  // Create organic cloud-like distribution
  const positions = [
    { x: 15, y: 20, rotate: -5 },
    { x: 35, y: 10, rotate: 3 },
    { x: 55, y: 25, rotate: -2 },
    { x: 75, y: 15, rotate: 7 },
    { x: 25, y: 40, rotate: -8 },
    { x: 65, y: 45, rotate: 4 },
    { x: 45, y: 35, rotate: -3 },
    { x: 85, y: 35, rotate: 6 },
    { x: 10, y: 60, rotate: -4 },
    { x: 30, y: 70, rotate: 2 },
    { x: 50, y: 65, rotate: -6 },
    { x: 80, y: 55, rotate: 5 },
    { x: 20, y: 85, rotate: 8 },
    { x: 60, y: 80, rotate: -7 },
    { x: 40, y: 90, rotate: 3 },
  ];
  
  // Use modulo to cycle through positions for many tags
  const basePosition = positions[index % positions.length];
  
  // Add some randomness while keeping it predictable
  const seed = (index * 7 + count * 3) % 100;
  const xOffset = (seed % 20) - 10; // -10 to +10
  const yOffset = ((seed * 3) % 20) - 10; // -10 to +10
  
  return {
    x: Math.max(5, Math.min(95, basePosition.x + xOffset)),
    y: Math.max(5, Math.min(95, basePosition.y + yOffset)),
    rotate: basePosition.rotate + ((seed % 6) - 3) // Additional rotation variance
  };
};
export function Tags() {
  const [searchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tags, setTags] = useState<TagData[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load tags on component mount
  useEffect(() => {
    const loadTags = async () => {
      try {
        const allTags = await getAllTags();
        setTags(allTags);
        
        // Check if there's a tag parameter in the URL
        const tagParam = searchParams.get('tag');
        if (tagParam) {
          setSelectedTag(tagParam);
          const articles = await getArticlesByTag(tagParam);
          setFilteredArticles(articles);
        }
      } catch (error) {
        console.error('Error loading tags:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, [searchParams]);
  
  // Shuffle tags for more interesting cloud layout
  const shuffledTags = [...tags].sort(() => Math.random() - 0.5);
  
  const handleTagClick = async (tagName: string) => {
    if (selectedTag === tagName) {
      setSelectedTag(null);
      setFilteredArticles([]);
    } else {
      setSelectedTag(tagName);
      try {
        const articles = await getArticlesByTag(tagName);
        // 按热度优先排序，然后按时间排序
        const sortedArticles = articles.sort((a, b) => {
          // 首先按热度排序：热度高的文章优先
          if (a.isHot && !b.isHot) return -1;  // a是热门，b不是，a排前面
          if (!a.isHot && b.isHot) return 1;   // b是热门，a不是，b排前面
          
          // 如果两篇文章热度相同（都是热门或都不是热门），则按时间排序
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setFilteredArticles(sortedArticles);
      } catch (error) {
        console.error('Error loading articles by tag:', error);
        setFilteredArticles([]);
      }
    }
  };
  
  const clearSelection = () => {
    setSelectedTag(null);
  };
  return <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">文章标签</h1>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-10 relative overflow-hidden">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">标签云</h2>
            
            {/* Background cloud decoration */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <path d="M100,150 Q120,100 160,120 Q200,80 240,120 Q280,100 300,150 Q290,200 240,180 Q200,220 160,180 Q120,200 100,150 Z" fill="currentColor" className="text-blue-300" />
                <path d="M50,200 Q70,160 100,170 Q130,140 160,170 Q190,160 210,200 Q200,240 160,230 Q130,260 100,230 Q70,240 50,200 Z" fill="currentColor" className="text-purple-200" />
                <path d="M200,50 Q220,20 250,30 Q280,10 300,50 Q290,80 250,70 Q220,90 200,50 Z" fill="currentColor" className="text-green-200" />
              </svg>
            </div>
            
            {/* Cloud-shaped tag layout with 3D perspective */}
            <div className="relative h-96 w-full perspective-1000" style={{ perspective: '1000px' }}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-slate-500 dark:text-slate-400">正在加载标签...</div>
                </div>
              ) : shuffledTags.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-slate-500 dark:text-slate-400">暂无标签数据</div>
                </div>
              ) : (
                shuffledTags.map((tag, index) => {
                const position = getCloudPosition(index, tag.count);
                // Calculate depth based on tag count and position for 3D effect
                const depth = (tag.count / 25) * 100; // 0-100px depth
                const opacity = Math.max(0.6, 1 - (depth / 200)); // Fade based on depth
                
                return (
                  <button 
                    key={tag.name} 
                    onClick={() => handleTagClick(tag.name)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-gradient-to-r transition-all duration-500 hover:scale-110 hover:opacity-100 shadow-md hover:shadow-xl cursor-pointer ${
                      selectedTag === tag.name 
                        ? 'from-blue-100 to-blue-200 dark:from-blue-600 dark:to-blue-500 ring-2 ring-blue-400 dark:ring-blue-300' 
                        : 'from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-600 dark:hover:to-slate-500'
                    } ${getColor(tag.count)} tag-cloud-item`} 
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      fontSize: `${getFontSize(tag.count, tags)}rem`,
                      fontWeight: tag.count > 15 ? 700 : tag.count > 10 ? 600 : 500,
                      transform: `translate(-50%, -50%) rotate(${position.rotate}deg) translateZ(${depth}px)`,
                      zIndex: Math.floor(tag.count / 3) + 1,
                      opacity: opacity,
                      animation: `float 6s ease-in-out infinite, breathe 4s ease-in-out infinite`,
                      animationDelay: `${index * 0.2}s, ${index * 0.3}s`,
                      filter: `blur(${depth / 100}px)`,
                      willChange: 'transform, opacity, filter'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'blur(0px)';
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = `translate(-50%, -50%) rotate(${position.rotate}deg) translateZ(${depth + 50}px) scale(1.15)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = `blur(${depth / 100}px)`;
                      e.currentTarget.style.opacity = String(opacity);
                      e.currentTarget.style.transform = `translate(-50%, -50%) rotate(${position.rotate}deg) translateZ(${depth}px)`;
                    }}
                  >
                    <span className="whitespace-nowrap font-medium drop-shadow-sm">
                      {tag.name}
                    </span>
                    <span className="ml-2 text-xs opacity-70 font-normal">
                      ({tag.count})
                    </span>
                  </button>
                );
                })
              )}
            </div>
            
            {/* Floating animation hint */}
            <div className="text-center mt-4 text-sm text-slate-500 dark:text-slate-400">
              💡 悬停标签查看更多效果
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              按字母排序
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading ? (
                <div className="col-span-full text-center text-slate-500 dark:text-slate-400">
                  正在加载标签...
                </div>
              ) : tags.length === 0 ? (
                <div className="col-span-full text-center text-slate-500 dark:text-slate-400">
                  暂无标签数据
                </div>
              ) : (
                tags.sort((a, b) => a.name.localeCompare(b.name)).map(tag => (
                  <button 
                    key={tag.name} 
                    onClick={() => handleTagClick(tag.name)}
                    className={`flex items-center justify-between px-4 py-2 rounded-md transition-colors ${
                      selectedTag === tag.name 
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-slate-700 dark:text-slate-300">{tag.name}</span>
                    <span className="bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full text-xs">
                      {tag.count}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
          
          {/* 文章列表部分 */}
          {selectedTag && (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  <TagIcon className="inline-block w-5 h-5 mr-2 text-blue-500" />
                  标签 "{selectedTag}" 相关文章 ({filteredArticles.length})
                </h2>
                <button
                  onClick={clearSelection}
                  className="flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-1" />
                  清除筛选
                </button>
              </div>
              
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map(article => (
                    <Link 
                      key={article.id} 
                      to={`/article/${article.id}`}
                      className="block bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="aspect-video overflow-hidden relative">
                        <LazyImage 
                          src={article.image || '/placeholder-image.jpg'} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                          aspectRatio="aspect-video"
                        />
                        {article.isHot && (
                          <div className="absolute top-2 right-2">
                            <FlameIcon size={24} />
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryColorForDarkMode(article.categoryColor)}`}>
                          {article.category}
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 line-clamp-2">
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
                              className={`inline-block px-2 py-1 rounded text-xs ${
                                tag === selectedTag 
                                  ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium' 
                                  : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                              }`}
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
              ) : (
                <div className="text-center py-12">
                  <TagIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">
                    暂无与标签 "{selectedTag}" 相关的文章
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>;
}