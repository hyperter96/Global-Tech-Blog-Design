import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { Link } from 'react-router-dom';
// Sample tags data with counts
const tags = [{
  id: 1,
  name: '电商平台',
  count: 24
}, {
  id: 2,
  name: 'SEO优化',
  count: 18
}, {
  id: 3,
  name: '广告投放',
  count: 15
}, {
  id: 4,
  name: '物流仓储',
  count: 12
}, {
  id: 5,
  name: '支付方案',
  count: 10
}, {
  id: 6,
  name: '数据分析',
  count: 19
}, {
  id: 7,
  name: '社交媒体',
  count: 22
}, {
  id: 8,
  name: '网站开发',
  count: 17
}, {
  id: 9,
  name: '客户服务',
  count: 6
}, {
  id: 10,
  name: '营销策略',
  count: 20
}, {
  id: 11,
  name: 'TikTok',
  count: 14
}, {
  id: 12,
  name: 'Facebook',
  count: 11
}, {
  id: 13,
  name: 'Instagram',
  count: 9
}, {
  id: 14,
  name: 'Google广告',
  count: 16
}, {
  id: 15,
  name: 'Shopify',
  count: 21
}, {
  id: 16,
  name: 'WooCommerce',
  count: 7
}, {
  id: 17,
  name: '亚马逊',
  count: 23
}, {
  id: 18,
  name: '速卖通',
  count: 13
}, {
  id: 19,
  name: '跨境支付',
  count: 8
}, {
  id: 20,
  name: '选品',
  count: 15
}, {
  id: 21,
  name: '品牌建设',
  count: 11
}, {
  id: 22,
  name: '市场调研',
  count: 9
}, {
  id: 23,
  name: '用户体验',
  count: 14
}, {
  id: 24,
  name: 'React',
  count: 12
}, {
  id: 25,
  name: 'TypeScript',
  count: 10
}, {
  id: 26,
  name: '移动端优化',
  count: 8
}, {
  id: 27,
  name: '内容营销',
  count: 17
}, {
  id: 28,
  name: '电子邮件营销',
  count: 7
}, {
  id: 29,
  name: '转化率优化',
  count: 13
}, {
  id: 30,
  name: '产品摄影',
  count: 6
}];
// Function to get font size based on tag count
const getFontSize = (count: number) => {
  const min = Math.min(...tags.map(tag => tag.count));
  const max = Math.max(...tags.map(tag => tag.count));
  const range = max - min;
  const normalizedCount = (count - min) / range;
  return 0.8 + normalizedCount * 1.2; // Font size between 0.8rem and 2.0rem
};
// Function to get a color based on tag count
const getColor = (count: number) => {
  const colorClasses = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-cyan-600', 'text-orange-500', 'text-red-500', 'text-indigo-600', 'text-pink-500'];
  // Use tag count to determine color index
  return colorClasses[count % colorClasses.length];
};
export function Tags() {
  // Shuffle tags for more interesting cloud layout
  const shuffledTags = [...tags].sort(() => Math.random() - 0.5);
  return <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">文章标签</h1>
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6">标签云</h2>
            <div className="flex flex-wrap justify-center">
              {shuffledTags.map(tag => <Link key={tag.id} to={`/tags/${tag.id}`} className={`px-3 py-2 m-2 rounded-full bg-slate-50 hover:bg-slate-100 transition-all ${getColor(tag.count)}`} style={{
              fontSize: `${getFontSize(tag.count)}rem`,
              fontWeight: tag.count > 15 ? 600 : 400
            }}>
                  {tag.name} ({tag.count})
                </Link>)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              按字母排序
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tags.sort((a, b) => a.name.localeCompare(b.name)).map(tag => <Link key={tag.id} to={`/tags/${tag.id}`} className="flex items-center justify-between px-4 py-2 rounded-md hover:bg-slate-50">
                    <span className="text-slate-700">{tag.name}</span>
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs">
                      {tag.count}
                    </span>
                  </Link>)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>;
}