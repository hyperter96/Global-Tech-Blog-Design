import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'aspect-w-16 aspect-h-9' | 'aspect-square' | string;
}

export function LazyImage({ src, alt, className = '', aspectRatio = 'aspect-w-16 aspect-h-9' }: LazyImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className={`relative ${aspectRatio} ${className}`}>
      {/* 加载动画 */}
      {loading && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-slate-300 dark:border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* 错误状态 */}
      {error && (
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
          <div className="text-center text-slate-500 dark:text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">图片加载失败</p>
          </div>
        </div>
      )}
      
      {/* 实际图片 */}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ display: error ? 'none' : 'block' }}
      />
    </div>
  );
}