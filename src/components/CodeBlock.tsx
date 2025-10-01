import React from 'react';

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  // 从className中提取语言信息
  const match = /language-(\w+)/.exec(className || '');
  const lang = language || (match ? match[1] : '');
  
  return (
    <div className="my-6 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
      {/* 语言标签 */}
      {lang && (
        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs text-slate-600 dark:text-slate-400 border-b border-slate-300 dark:border-slate-600">
          {lang}
        </div>
      )}
      {/* 代码区域 */}
      <div className="bg-slate-50 dark:bg-slate-900 overflow-x-auto">
        <pre className="p-4 text-sm">
          <code 
            className={className}
            style={{
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          >
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}

export function InlineCode({ children, ...props }: React.HTMLProps<HTMLElement>) {
  return (
    <code
      className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded font-mono text-sm"
      {...props}
    >
      {children}
    </code>
  );
}
