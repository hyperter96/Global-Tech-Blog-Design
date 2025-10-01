
import { Link } from 'react-router-dom';
import { ClockIcon, UserIcon } from 'lucide-react';
import { LazyImage } from './LazyImage';
import { FlameIcon } from './FlameIcon';

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
interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
  categoryColor: string;
  isHot?: boolean;
}
export function ArticleCard({
  id,
  title,
  summary,
  category,
  date,
  readTime,
  author,
  image,
  categoryColor,
  isHot
}: ArticleCardProps) {
  return (
    <Link 
      to={`/article/${id}`}
      className="block bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden card-hover h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {image && (
        <div className="relative overflow-hidden">
          <div className="transform transition-transform duration-500 group-hover:scale-110">
            <LazyImage
              src={image}
              alt={title}
              className="h-48 flex-shrink-0"
              aspectRatio="aspect-w-16 aspect-h-9"
            />
          </div>
          {/* 悬停遮罩层 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {isHot && (
            <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg animate-pulse">
              <FlameIcon size={16} className="drop-shadow-sm" />
            </div>
          )}
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${getCategoryColorForDarkMode(categoryColor)} self-start transition-transform duration-300 group-hover:scale-105`}>
          {category}
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow line-clamp-3">
          {summary}
        </p>
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
          <div className="flex items-center mr-4">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-4 w-4 mr-1" />
            <span>{author}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-slate-500 dark:text-slate-400">{date}</span>
          <span className="text-blue-900 dark:text-blue-400 group-hover:text-orange-500 dark:group-hover:text-orange-400 font-medium text-sm transition-colors">
            阅读更多 →
          </span>
        </div>
      </div>
    </Link>
  );
}