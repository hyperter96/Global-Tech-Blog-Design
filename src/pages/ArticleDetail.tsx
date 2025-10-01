import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { LazyImage } from '../components/LazyImage';
import { ArticleDetailSkeleton } from '../components/Skeleton';

import { TableOfContents } from '../components/TableOfContents';
import { DefaultGiscusComments } from '../components/GiscusComments';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { ArrowLeftIcon, ClockIcon, UserIcon, CalendarIcon, TagIcon, CopyIcon, CheckIcon } from 'lucide-react';
import { loadArticle, type Article } from '../utils/articleManager';
import { FlameIcon } from '../components/FlameIcon';

// Article 类型已从 articleManager 中导入

// 语言颜色映射
const getLanguageColor = (language: string): string => {
  const colors: {[key: string]: string} = {
    'javascript': 'text-yellow-600 dark:text-yellow-400',
    'typescript': 'text-blue-600 dark:text-blue-400',
    'python': 'text-green-600 dark:text-green-400',
    'java': 'text-orange-600 dark:text-orange-400',
    'css': 'text-blue-500 dark:text-blue-300',
    'html': 'text-red-600 dark:text-red-400',
    'json': 'text-gray-600 dark:text-gray-400',
    'markdown': 'text-purple-600 dark:text-purple-400',
    'bash': 'text-green-700 dark:text-green-300',
    'shell': 'text-green-700 dark:text-green-300',
    'sql': 'text-indigo-600 dark:text-indigo-400',
    'php': 'text-purple-700 dark:text-purple-300',
    'ruby': 'text-red-700 dark:text-red-300',
    'go': 'text-cyan-600 dark:text-cyan-400',
    'rust': 'text-orange-700 dark:text-orange-300',
    'c': 'text-blue-700 dark:text-blue-300',
    'cpp': 'text-blue-800 dark:text-blue-200',
    'csharp': 'text-purple-800 dark:text-purple-200',
    'mermaid': 'text-teal-600 dark:text-teal-400',
    'yaml': 'text-red-500 dark:text-red-300',
    'xml': 'text-orange-500 dark:text-orange-300',
  };
  return colors[language.toLowerCase()] || 'text-slate-600 dark:text-slate-400';
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

export function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentCopyingId, setCurrentCopyingId] = useState<string | null>(null);

  useEffect(() => {
    const loadArticleData = async () => {
      if (!id) {
        setArticle(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        // 直接加载完整的文章（包含元数据和内容）
        const article = await loadArticle(id);
        setArticle(article);
        
        // 语言检测现在直接在渲染时进行
      } catch (error) {
        console.error('Failed to load article:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    loadArticleData();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCopyCode = async (code: string, blockId: string, event?: React.MouseEvent) => {
    // 阻止默认行为和事件冒泡，防止页面跳转
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.preventDefault();
      event.nativeEvent.stopImmediatePropagation();
    }
    
    // 防止重复点击
    if (currentCopyingId === blockId) return;
    
    setCurrentCopyingId(blockId);
    
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopiedStates(prev => ({ ...prev, [blockId]: true }));
      setToastMessage('代码已复制到剪贴板');
      
      // 2秒后重置复制状态
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [blockId]: false }));
        setCurrentCopyingId(null);
      }, 2000);
      
      // 3秒后隐藏toast
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      

    } catch (err) {
      console.error('Failed to copy code: ', err);
      
      // 降级方案：使用传统的选择和复制方法
      try {
        const textArea = document.createElement('textarea');
        textArea.value = code.trim();
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setCopiedStates(prev => ({ ...prev, [blockId]: true }));
        setToastMessage('代码已复制到剪贴板');
        
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [blockId]: false }));
          setCurrentCopyingId(null);
        }, 2000);
        
        setTimeout(() => {
          setToastMessage(null);
        }, 3000);
        

      } catch (fallbackErr) {
        console.error('Fallback copy method also failed: ', fallbackErr);
        setToastMessage('复制失败，请手动选择代码');
        setCurrentCopyingId(null);
        setTimeout(() => {
          setToastMessage(null);
        }, 3000);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Return button skeleton */}
              <div className="w-24 h-6 bg-slate-200 dark:bg-slate-700 rounded mb-6 animate-pulse"></div>
              <ArticleDetailSkeleton />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                文章未找到
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                抱歉，请求的文章不存在或已被删除。
              </p>
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 bg-blue-900 dark:bg-blue-600 text-white rounded-md hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                返回上页
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* 返回按钮 */}
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              返回上页
            </button>

            {/* 文章内容和目录布局 */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* 文章主内容 */}
              <div className="xl:col-span-3">
                <article className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
              {/* 文章图片 */}
              {article.image && (
                <LazyImage
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 sm:h-80"
                  aspectRatio=""
                />
              )}

              <div className="p-6 sm:p-8">
                {/* 分类标签 */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${getCategoryColorForDarkMode(article.categoryColor)}`}>
                  {article.category}
                </div>

                {/* 文章标题 */}
                <div className="flex items-start gap-3 mb-6">
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200 leading-tight flex-1">
                    {article.title}
                  </h1>
                  {article.isHot && (
                    <div className="flex-shrink-0 mt-1">
                      <FlameIcon size={32} />
                    </div>
                  )}
                </div>

                {/* 文章元信息 */}
                <div className="flex flex-wrap items-center text-sm text-slate-600 dark:text-slate-400 mb-6 space-x-6">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2" />
                    <span>作者：{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    <span>阅读时间：{article.readTime}</span>
                  </div>
                </div>

                {/* 文章标签 */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 文章内容 */}
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={{
                      // 自定义标题样式 - 添加ID用于目录导航
                      h1({ children }) {
                        const text = String(children);
                        const id = text
                          .toLowerCase()
                          .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
                          .replace(/\s+/g, '-')
                          .replace(/-+/g, '-')
                          .replace(/^-|-$/g, '');
                        
                        return (
                          <h1 id={id} className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-6 pb-2 border-b border-slate-200 dark:border-slate-700 scroll-mt-20">
                            {children}
                          </h1>
                        );
                      },
                      h2({ children }) {
                        const text = String(children);
                        const id = text
                          .toLowerCase()
                          .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
                          .replace(/\s+/g, '-')
                          .replace(/-+/g, '-')
                          .replace(/^-|-$/g, '');
                        
                        return (
                          <h2 id={id} className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4 scroll-mt-20">
                            {children}
                          </h2>
                        );
                      },
                      h3({ children }) {
                        const text = String(children);
                        const id = text
                          .toLowerCase()
                          .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
                          .replace(/\s+/g, '-')
                          .replace(/-+/g, '-')
                          .replace(/^-|-$/g, '');
                        
                        return (
                          <h3 id={id} className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3 scroll-mt-20">
                            {children}
                          </h3>
                        );
                      },
                      h4({ children }) {
                        const text = String(children);
                        const id = text
                          .toLowerCase()
                          .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
                          .replace(/\s+/g, '-')
                          .replace(/-+/g, '-')
                          .replace(/^-|-$/g, '');
                        
                        return (
                          <h4 id={id} className="text-lg font-medium text-slate-900 dark:text-slate-100 mt-6 mb-3 scroll-mt-20">
                            {children}
                          </h4>
                        );
                      },
                      h5({ children }) {
                        const text = String(children);
                        const id = text
                          .toLowerCase()
                          .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
                          .replace(/\s+/g, '-')
                          .replace(/-+/g, '-')
                          .replace(/^-|-$/g, '');
                        
                        return (
                          <h5 id={id} className="text-base font-medium text-slate-900 dark:text-slate-100 mt-4 mb-2 scroll-mt-20">
                            {children}
                          </h5>
                        );
                      },
                      h6({ children }) {
                        const text = String(children);
                        const id = text
                          .toLowerCase()
                          .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
                          .replace(/\s+/g, '-')
                          .replace(/-+/g, '-')
                          .replace(/^-|-$/g, '');
                        
                        return (
                          <h6 id={id} className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-4 mb-2 scroll-mt-20">
                            {children}
                          </h6>
                        );
                      },
                      // 自定义段落样式
                      p({ children }) {
                        return (
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            {children}
                          </p>
                        );
                      },
                      // 自定义列表样式
                      ul({ children }) {
                        return (
                          <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-4 space-y-2">
                            {children}
                          </ul>
                        );
                      },
                      ol({ children }) {
                        return (
                          <ol className="list-decimal list-inside text-slate-700 dark:text-slate-300 mb-4 space-y-2">
                            {children}
                          </ol>
                        );
                      },
                      li({ children }) {
                        return (
                          <li className="text-slate-700 dark:text-slate-300 mb-1">
                            {children}
                          </li>
                        );
                      },
                      // 代码块样式
                      pre({ children, className, ...props }: React.HTMLProps<HTMLPreElement> & { 'data-language'?: string }) {
                        // 从子元素中提取语言信息和代码内容
                        const code = React.Children.toArray(children).find(
                          child => React.isValidElement(child) && child.type === 'code'
                        ) as React.ReactElement | undefined;
                        
                        // 提取纯文本代码内容
                        const extractAllText = (element: React.ReactNode): string => {
                          if (typeof element === 'string') {
                            return element;
                          }
                          if (React.isValidElement(element)) {
                            if (element.props?.children) {
                              if (typeof element.props.children === 'string') {
                                return element.props.children;
                              }
                              if (Array.isArray(element.props.children)) {
                                return element.props.children.map(extractAllText).join('');
                              }
                              return extractAllText(element.props.children);
                            }
                          }
                          return '';
                        };
                        
                        let codeText = '';
                        if (Array.isArray(children)) {
                          codeText = children.map(extractAllText).join('');
                        } else {
                          codeText = extractAllText(children);
                        }

                        // 提取类名
                        let codeClassName = code?.props?.className || '';
                        const preClassName = className || '';
                        
                        if (!codeClassName) {
                          const findCodeElement = (element: React.ReactNode): string => {
                            if (React.isValidElement(element)) {
                              if (element.type === 'code' && element.props?.className) {
                                return element.props.className;
                              }
                              if (element.props?.children) {
                                const children = Array.isArray(element.props.children) 
                                  ? element.props.children 
                                  : [element.props.children];
                                for (const child of children) {
                                  const result = findCodeElement(child);
                                  if (result) return result;
                                }
                              }
                            }
                            return '';
                          };
                          
                          codeClassName = findCodeElement(children);
                        }

                        // 从多个来源提取语言信息
                        let language = '';
                        
                        // 1. 尝试从 data-language 属性获取
                        const findDataLanguage = (element: React.ReactNode): string => {
                          if (React.isValidElement(element)) {
                            if (element.props?.['data-language']) {
                              return element.props['data-language'];
                            }
                            if (element.props?.children) {
                              const children = Array.isArray(element.props.children) 
                                ? element.props.children 
                                : [element.props.children];
                              for (const child of children) {
                                const result = findDataLanguage(child);
                                if (result) return result;
                              }
                            }
                          }
                          return '';
                        };
                        
                        language = findDataLanguage(children);
                        
                        // 2-4. 尝试从各种 className 格式提取
                        if (!language) {
                          let match = /language-(\w+)/.exec(codeClassName) || 
                                     /language-(\w+)/.exec(preClassName) ||
                                     /hljs\s+language-(\w+)/.exec(codeClassName) || 
                                     /hljs\s+language-(\w+)/.exec(preClassName);
                          if (match) {
                            language = match[1];
                          }
                        }
                        
                        // 5. 从原始 markdown 内容解析
                        if (!language && article?.content) {
                          const codeBlockRegex = /```(\w+)?\s*\n([\s\S]*?)\n```/g;
                          let contentMatch;
                          while ((contentMatch = codeBlockRegex.exec(article.content)) !== null) {
                            const blockLanguage = contentMatch[1] || '';
                            const blockCode = contentMatch[2] || '';
                            if (blockCode.trim() === codeText.trim() && blockLanguage) {
                              language = blockLanguage;
                              break;
                            }
                          }
                        }
                        
                        // 6. 智能推断
                        if (!language && codeText) {
                          const trimmedCode = codeText.trim();
                          
                          // JavaScript 检测
                          if (trimmedCode.includes('import ') && (trimmedCode.includes('from ') || trimmedCode.includes('require('))) {
                            language = 'javascript';
                          } else if (trimmedCode.includes('const ') || trimmedCode.includes('let ') || trimmedCode.includes('var ')) {
                            language = 'javascript';
                          } else if (trimmedCode.includes('function ') || trimmedCode.includes('=>') || trimmedCode.includes('console.log')) {
                            language = 'javascript';
                          }
                          // Python 检测
                          else if (trimmedCode.includes('def ') && trimmedCode.includes(':')) {
                            language = 'python';
                          } else if (trimmedCode.includes('print(') || trimmedCode.includes('import ')) {
                            language = 'python';
                          }
                          // 其他语言
                          else if (trimmedCode.includes('<?php')) {
                            language = 'php';
                          } else if (trimmedCode.includes('public class ') || trimmedCode.includes('private class ')) {
                            language = 'java';
                          } else if (trimmedCode.includes('#include') || trimmedCode.includes('int main(')) {
                            language = 'c';
                          } else if (trimmedCode.includes('SELECT ') || trimmedCode.includes('INSERT ') || trimmedCode.includes('UPDATE ')) {
                            language = 'sql';
                          }
                          // Mermaid 图表检测
                          else if (trimmedCode.includes('graph ') || trimmedCode.includes('flowchart ') || trimmedCode.includes('sequenceDiagram')) {
                            language = 'mermaid';
                          }
                          // Markdown 检测
                          else if (trimmedCode.includes('# ') || trimmedCode.includes('## ') || trimmedCode.includes('* ') || trimmedCode.includes('- ')) {
                            language = 'markdown';
                          }
                        }

                        
                        // 生成用于复制功能的blockId（使用代码内容的哈希）
                        const generateHash = (str: string): string => {
                          let hash = 0;
                          for (let i = 0; i < str.length; i++) {
                            const char = str.charCodeAt(i);
                            hash = ((hash << 5) - hash) + char;
                            hash = hash & hash;
                          }
                          return Math.abs(hash).toString(36);
                        };
                        
                        const trimmedCodeText = codeText.trim();
                        const blockId = `code-${generateHash(trimmedCodeText)}`;
                        const isCopied = copiedStates[blockId] || false;
                        
                        // 如果是 Mermaid 图表，使用 MermaidDiagram 组件渲染
                        if (language === 'mermaid') {
                          return <MermaidDiagram chart={trimmedCodeText} />;
                        }
                        
                        // 处理代码行：移除末尾空行，确保行号与代码行对齐
                        const codeLines = trimmedCodeText.split('\n');
                        const showLineNumbers = codeLines.length > 3;
                        
                        return (
                          <div className="my-6 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden shadow-sm">
                            {/* 头部：语言标签和复制按钮 */}
                            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-300 dark:border-slate-600 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className={`text-xs font-semibold ml-2 select-none ${language ? getLanguageColor(language) : 'text-slate-600 dark:text-slate-400'}`}>
                                  {language ? language.toUpperCase() : 'CODE'}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => handleCopyCode(codeText, blockId, e)}
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium select-none rounded-md transition-all duration-300 ${
                                  isCopied 
                                    ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' 
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                                }`}
                                title={isCopied ? "已复制到剪贴板" : "复制代码到剪贴板"}
                                disabled={isCopied}
                              >
                                {isCopied ? (
                                  <>
                                    <CheckIcon size={14} className="text-green-500 dark:text-green-400" />
                                    <span className="hidden sm:inline text-green-600 dark:text-green-400">已复制</span>
                                  </>
                                ) : (
                                  <>
                                    <CopyIcon size={14} />
                                    <span className="hidden sm:inline">复制</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="bg-white dark:bg-slate-900 overflow-x-auto relative">
                              {showLineNumbers ? (
                                <div className="relative">
                                  {/* 行号背景 */}
                                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700"></div>
                                  
                                  {/* 行号 */}
                                  <div className="absolute left-0 w-16 text-xs text-slate-400 dark:text-slate-500 select-none font-mono text-right px-3 pointer-events-none"
                                       style={{
                                         top: '16px',
                                         fontFamily: 'Fira Code, Consolas, Monaco, "Courier New", monospace',
                                         fontSize: '12px'
                                       }}>
                                    {codeLines.map((_: string, index: number) => (
                                      <div 
                                        key={index}
                                        style={{
                                          height: '24px',
                                          lineHeight: '24px'
                                        }}
                                      >
                                        {index + 1}
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {/* 代码内容 */}
                                  <pre 
                                    className={`text-sm ${className || ''} code-with-line-numbers`}
                                    {...props}
                                    style={{
                                      fontFamily: 'Fira Code, Consolas, Monaco, "Courier New", monospace',
                                      fontSize: '14px',
                                      lineHeight: '24px',
                                      margin: 0,
                                      background: 'transparent',
                                      whiteSpace: 'pre',
                                      tabSize: 2,
                                      paddingTop: '16px',
                                      paddingBottom: '16px',
                                      paddingLeft: '4.5rem',
                                      paddingRight: '16px'
                                    }}
                                  >
                                    {children}
                                  </pre>
                                </div>
                              ) : (
                                <pre 
                                  className={`p-4 text-sm ${className || ''}`}
                                  {...props}
                                  style={{
                                    fontFamily: 'Fira Code, Consolas, Monaco, "Courier New", monospace',
                                    fontSize: '14px',
                                    lineHeight: '24px',
                                    margin: 0,
                                    background: 'transparent',
                                    whiteSpace: 'pre',
                                    tabSize: 2
                                  }}
                                >
                                  {children}
                                </pre>
                              )}
                            </div>
                          </div>
                        );
                      },
                      // 内联代码样式
                      code({ className, children, ...props }: React.HTMLProps<HTMLElement>) {
                        // 如果这是代码块中的code元素，直接传递语言信息
                        if (className && (className.includes('language-') || className.includes('hljs'))) {
                          const match = /language-(\w+)/.exec(className);
                          const language = match ? match[1] : '';
                          
                          // 直接将语言信息添加到data属性中
                          return (
                            <code 
                              className={className} 
                              data-language={language}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        }
                        
                        // 处理内联代码
                        return (
                          <code
                            className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded font-mono text-sm"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      // 自定义表格样式
                      table({ children }) {
                        return (
                          <div className="overflow-x-auto my-6 rounded-lg border border-slate-300 dark:border-slate-600 not-prose shadow-sm">
                            <table className="min-w-full border-collapse bg-white dark:bg-slate-800 table-auto">
                              {children}
                            </table>
                          </div>
                        );
                      },
                      thead({ children }) {
                        return (
                          <thead className="bg-slate-100 dark:bg-slate-700 border-b-2 border-slate-300 dark:border-slate-600">
                            {children}
                          </thead>
                        );
                      },
                      tbody({ children }) {
                        return (
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                            {children}
                          </tbody>
                        );
                      },
                      th({ children }) {
                        return (
                          <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100 border-b-2 border-slate-300 dark:border-slate-600 border-r border-slate-200 dark:border-slate-500 last:border-r-0 bg-slate-50 dark:bg-slate-700">
                            {children}
                          </th>
                        );
                      },
                      td({ children }) {
                        return (
                          <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-600 border-r border-slate-200 dark:border-slate-600 last:border-r-0">
                            {children}
                          </td>
                        );
                      },
                      // 自定义引用块样式
                      blockquote({ children }) {
                        return (
                          <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-6 py-4 my-6 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                            <div className="text-slate-700 dark:text-slate-300 italic">
                              {children}
                            </div>
                          </blockquote>
                        );
                      },
                      // 自定义强调文本
                      strong({ children }) {
                        return (
                          <strong className="font-semibold text-slate-900 dark:text-slate-100">
                            {children}
                          </strong>
                        );
                      },
                      em({ children }) {
                        return (
                          <em className="italic text-slate-700 dark:text-slate-300">
                            {children}
                          </em>
                        );
                      },
                      // 自定义链接样式
                      a({ children, href }) {
                        return (
                          <a 
                            href={href} 
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        );
                      },
                      // 自定义分隔线
                      hr() {
                        return (
                          <hr className="my-8 border-slate-200 dark:border-slate-700" />
                        );
                      }
                    }}
                  >
                    {article.content}
                  </ReactMarkdown>
                </div>

                {/* 文章底部信息 */}
                <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        本文由 <span className="font-medium text-slate-800 dark:text-slate-200">{article.author}</span> 撰写
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-500">
                        发布于 {article.date} · 预计阅读 {article.readTime}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center px-4 py-2 bg-blue-900 dark:bg-blue-600 text-white rounded-md hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
                    >
                      <ArrowLeftIcon className="h-4 w-4 mr-2" />
                      返回文章列表
                    </button>
                  </div>
                </div>

                {/* 评论区域 */}
                <DefaultGiscusComments />
              </div>
            </article>
              </div>

              {/* 右侧目录 */}
              <div className="xl:col-span-1">
                <TableOfContents content={article.content} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
      
      {/* Toast 通知 */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 toast-enter">
          <div className="bg-green-500 dark:bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm">
            <CheckIcon size={16} />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}