import React from 'react';

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className = '', lines = 1 }: SkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-slate-200 dark:bg-slate-700 rounded ${
            index === lines - 1 ? 'mb-0' : 'mb-2'
          } ${
            index === 0 ? 'h-4' : index === lines - 1 ? 'h-4 w-3/4' : 'h-4'
          }`}
        />
      ))}
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-w-16 aspect-h-9">
        <div className="bg-slate-200 dark:bg-slate-700 animate-pulse h-48 w-full" />
      </div>
      
      <div className="p-6">
        {/* Category skeleton */}
        <div className="w-20 h-6 bg-slate-200 dark:bg-slate-700 rounded-full mb-4 animate-pulse" />
        
        {/* Title skeleton */}
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-3 animate-pulse" />
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3 animate-pulse" />
        
        {/* Summary skeleton */}
        <Skeleton lines={3} className="mb-4" />
        
        {/* Meta info skeleton */}
        <div className="flex items-center mb-4">
          <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded mr-4 animate-pulse" />
          <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        
        {/* Footer skeleton */}
        <div className="flex justify-between items-center">
          <div className="w-20 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ArticleDetailSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      {/* Image skeleton */}
      <div className="h-64 sm:h-80 bg-slate-200 dark:bg-slate-700 animate-pulse" />
      
      <div className="p-6 sm:p-8">
        {/* Category skeleton */}
        <div className="w-24 h-6 bg-slate-200 dark:bg-slate-700 rounded-full mb-4 animate-pulse" />
        
        {/* Title skeleton */}
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-6 animate-pulse" />
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-6 animate-pulse" />
        
        {/* Meta info skeleton */}
        <div className="flex flex-wrap items-center mb-6 space-x-6">
          <div className="w-20 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="w-20 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-16 h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"
            />
          ))}
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <Skeleton lines={4} />
          <div className="w-32 h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
          <Skeleton lines={5} />
          <div className="w-40 h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
          <Skeleton lines={3} />
        </div>
      </div>
    </div>
  );
}