import { useEffect, useRef, useState } from 'react';

interface GiscusCommentsProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  term?: string;
  reactionsEnabled?: '1' | '0';
  emitMetadata?: '0' | '1';
  inputPosition?: 'top' | 'bottom';
  theme?: 'light' | 'dark' | 'preferred_color_scheme' | 'transparent_dark' | 'dark_dimmed' | 'cobalt' | 'dark_high_contrast' | 'light_high_contrast' | 'light_protanopia' | 'dark_protanopia' | 'light_tritanopia' | 'dark_tritanopia';
  lang?: string;
  loading?: 'lazy' | 'eager';
}

export function GiscusComments({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  term,
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'bottom',
  theme = 'preferred_color_scheme',
  lang = 'zh-CN',
  loading = 'lazy'
}: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // 清除之前的 giscus 内容
    currentRef.innerHTML = '';
    setIsLoading(true);

    // 创建 giscus 脚本
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    if (term) script.setAttribute('data-term', term);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', reactionsEnabled);
    script.setAttribute('data-emit-metadata', emitMetadata);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', loading);
    script.crossOrigin = 'anonymous';
    script.async = true;

    // 监听脚本加载完成
    script.onload = () => {
      // 等待 giscus iframe 加载
      setTimeout(() => {
        const iframe = document.querySelector('iframe.giscus-frame');
        if (iframe) {
          setIsLoading(false);
        }
      }, 500);
    };

    currentRef.appendChild(script);

    // 备用方案：2秒后自动隐藏加载动画
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      if (currentRef) {
        currentRef.innerHTML = '';
      }
      clearTimeout(timeout);
    };
  }, [repo, repoId, category, categoryId, mapping, term, reactionsEnabled, emitMetadata, inputPosition, theme, lang, loading]);

  // 监听主题变化
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        'https://giscus.app'
      );
    }
  }, [theme]);

  return (
    <div className="giscus-container relative">
      {/* 加载动画 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center min-h-[200px] bg-white dark:bg-slate-800 rounded-lg">
          <div className="flex flex-col items-center gap-4">
            {/* 旋转加载器 */}
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-500 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
            </div>
            {/* 加载文本 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">正在加载评论</span>
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Giscus 容器 - 使用淡入动画 */}
      <div 
        ref={ref} 
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
}

import { giscusConfig } from '../config/giscus';

// 带默认配置的组件，用于简化使用
export function DefaultGiscusComments() {

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
        评论讨论
      </h3>
      <GiscusComments {...giscusConfig} />
    </div>
  );
}