import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfUse } from './pages/TermsOfUse';
import { CookiePolicy } from './pages/CookiePolicy';
import { Disclaimer } from './pages/Disclaimer';
import { Categories } from './pages/Categories';
import { CategoryArticles } from './pages/CategoryArticles';
import { Tags } from './pages/Tags';
import { ArticleDetail } from './pages/ArticleDetail';

// 重定向组件：从 /articles/:filename 重定向到 /article/:id
function ArticleRedirect() {
  const { filename } = useParams<{ filename: string }>();
  
  // 从文件名提取ID（移除.md扩展名）
  const id = filename?.replace('.md', '') || '';
  
  return <Navigate to={`/article/${id}`} replace />;
}
export function AppRouter() {
  return <BrowserRouter 
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<CategoryArticles />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        {/* 重定向 /articles/:filename 到 /article/:id */}
        <Route path="/articles/:filename" element={<ArticleRedirect />} />
      </Routes>
    </BrowserRouter>;
}