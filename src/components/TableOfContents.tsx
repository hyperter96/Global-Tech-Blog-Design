import { useState, useEffect } from 'react';
import { ListIcon, ChevronRightIcon } from 'lucide-react';

// 阅读进度组件
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      
      // 确保进度不超过100%，并且在接近底部时设置为100%
      const finalProgress = Math.min(100, Math.max(0, scrollPercentRounded));
      
      // 当滚动到接近底部时（距离底部小于50px），设置为100%
      if (scrollTop + winHeight >= docHeight - 50) {
        setProgress(100);
      } else {
        setProgress(finalProgress);
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // 初始调用

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
        <span>阅读进度</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div 
          className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 解析Markdown内容，提取标题
  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5\s-]/g, '') // 保留中文字符
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      items.push({ id, text, level });
    }

    setTocItems(items);
  }, [content]);

  // 监听滚动，高亮当前章节
  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map(item => {
        const element = document.getElementById(item.id);
        return {
          id: item.id,
          element,
          top: element ? element.offsetTop : 0
        };
      }).filter(item => item.element);

      const scrollTop = window.scrollY + 120; // 增加偏移量以配合导航栏高度
      
      for (let i = headings.length - 1; i >= 0; i--) {
        if (scrollTop >= headings[i].top) {
          setActiveId(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始调用

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  // 点击目录项，滚动到对应位置
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 100; // 增加偏移量以避免被导航栏遮挡
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 max-h-[calc(100vh-8rem)]">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 max-h-[60vh] flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
          <div className="flex items-center space-x-2">
            <ListIcon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              目录
            </h3>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <ChevronRightIcon 
              className={`h-4 w-4 text-slate-600 dark:text-slate-400 transition-transform ${
                isCollapsed ? 'rotate-0' : 'rotate-90'
              }`} 
            />
          </button>
        </div>

        {/* 目录内容 */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto toc-scrollbar">
            <nav className="p-2">
              <ul className="space-y-1">
                {tocItems.map((item, index) => {
                  const isActive = activeId === item.id;
                  const marginLeft = (item.level - 1) * 12; // 根据层级缩进

                  return (
                    <li key={index}>
                      <button
                        onClick={() => scrollToHeading(item.id)}
                        className={`
                          w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200
                          hover:bg-slate-100 dark:hover:bg-slate-700
                          ${isActive 
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500 dark:border-blue-400' 
                            : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                          }
                        `}
                        style={{ marginLeft: `${marginLeft}px` }}
                        title={item.text}
                      >
                        <span className="block truncate">
                          {item.text}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* 进度指示器 */}
      <ReadingProgress />
    </div>
  );
}