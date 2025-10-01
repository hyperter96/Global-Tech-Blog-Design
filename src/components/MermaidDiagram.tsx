import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import './MermaidDiagram.css';

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // 初始化 Mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#1e293b',
        primaryBorderColor: '#60a5fa',
        lineColor: '#64748b',
        secondaryColor: '#818cf8',
        tertiaryColor: '#a5b4fc',
      },
    });

    const renderDiagram = async () => {
      if (!elementRef.current || !chart) return;

      try {
        // 清除之前的错误
        setError('');

        // 生成唯一ID
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // 渲染图表
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('图表渲染失败');
        // 显示原始代码作为后备方案
      }
    };

    renderDiagram();
  }, [chart]);

  // 监听主题变化以重新渲染图表
  useEffect(() => {
    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      mermaid.initialize({
        startOnLoad: true,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
        themeVariables: isDark ? {
          primaryColor: '#3b82f6',
          primaryTextColor: '#e2e8f0',
          primaryBorderColor: '#60a5fa',
          lineColor: '#94a3b8',
          secondaryColor: '#818cf8',
          tertiaryColor: '#a5b4fc',
          background: '#1e293b',
          mainBkg: '#1e293b',
          secondBkg: '#334155',
          tertiaryBkg: '#475569',
        } : {
          primaryColor: '#3b82f6',
          primaryTextColor: '#1e293b',
          primaryBorderColor: '#60a5fa',
          lineColor: '#64748b',
          secondaryColor: '#818cf8',
          tertiaryColor: '#a5b4fc',
        },
      });

      // 重新渲染图表
      const renderDiagram = async () => {
        if (!elementRef.current || !chart) return;

        try {
          setError('');
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg: renderedSvg } = await mermaid.render(id, chart);
          setSvg(renderedSvg);
        } catch (err) {
          console.error('Mermaid rendering error:', err);
          setError('图表渲染失败');
        }
      };

      renderDiagram();
    };

    // 监听主题变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        <pre className="mt-2 text-xs text-red-800 dark:text-red-300 overflow-x-auto">
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      className="my-6 flex justify-center items-center p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto"
    >
      {svg ? (
        <div
          className="mermaid-diagram"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="text-slate-400 dark:text-slate-500 text-sm">
          正在渲染图表...
        </div>
      )}
    </div>
  );
};
