import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";

interface SimpleCodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

export function SimpleCodeBlock({ children, className, language }: SimpleCodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  
  // 从className中提取语言
  const match = /language-(\w+)/.exec(className || '');
  const detectedLanguage = language || (match ? match[1] : 'javascript');
  
  useEffect(() => {
    if (codeRef.current && children) {
      // 清除之前的高亮
      codeRef.current.removeAttribute('data-highlighted');
      codeRef.current.className = `language-${detectedLanguage}`;
      codeRef.current.textContent = children;
      
      // 应用语法高亮
      hljs.highlightElement(codeRef.current);
      
      console.log('SimpleCodeBlock highlighting applied:', {
        language: detectedLanguage,
        element: codeRef.current,
        classList: codeRef.current.classList.toString(),
        innerHTML: codeRef.current.innerHTML.substring(0, 100)
      });
    }
  }, [children, detectedLanguage]);

  return (
    <div className="my-6 rounded-lg overflow-hidden shadow-sm border border-gray-200">
      {/* 语言标签 */}
      <div className="bg-gray-100 px-4 py-2 text-xs text-gray-600 border-b border-gray-200 font-medium">
        {detectedLanguage}
      </div>
      {/* 代码区域 */}
      <div className="relative">
        <pre 
          className="!bg-white !m-0 !p-4 overflow-x-auto text-sm"
          style={{ 
            background: '#ffffff !important',
            margin: '0 !important'
          }}
        >
          <code 
            ref={codeRef}
            className={`language-${detectedLanguage}`}
            style={{ background: 'transparent' }}
          >
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}