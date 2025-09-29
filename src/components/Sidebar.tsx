import React from 'react';
import { UserIcon, MailIcon, TwitterIcon, LinkedinIcon, GithubIcon } from 'lucide-react';
export function Sidebar() {
  // Sample data for popular posts
  const popularPosts = [{
    id: 1,
    title: '亚马逊FBA新政策解析',
    views: 2345
  }, {
    id: 2,
    title: 'Shopify独立站搭建完全指南',
    views: 1987
  }, {
    id: 3,
    title: 'Google广告投放策略',
    views: 1756
  }, {
    id: 4,
    title: '跨境电商支付解决方案',
    views: 1543
  }, {
    id: 5,
    title: 'TikTok Shop运营技巧',
    views: 1289
  }];
  // Sample data for tags
  const tags = [{
    name: '电商平台',
    count: 24
  }, {
    name: 'SEO优化',
    count: 18
  }, {
    name: '广告投放',
    count: 15
  }, {
    name: '物流仓储',
    count: 12
  }, {
    name: '支付方案',
    count: 10
  }, {
    name: '数据分析',
    count: 9
  }, {
    name: '社交媒体',
    count: 8
  }, {
    name: '网站开发',
    count: 7
  }, {
    name: '客户服务',
    count: 6
  }, {
    name: '营销策略',
    count: 5
  }];
  return <aside className="space-y-8">
      {/* About Author */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center text-white text-2xl">
            <UserIcon className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-bold text-lg">李明</h3>
            <p className="text-slate-600 text-sm">跨境电商顾问 & 技术专家</p>
          </div>
        </div>
        <p className="text-slate-700 mb-4">
          10年跨境电商和技术开发经验，专注于帮助企业拓展全球市场，优化运营流程。
        </p>
        <div className="flex space-x-2">
          <a href="#" className="text-slate-500 hover:text-blue-900">
            <TwitterIcon className="h-5 w-5" />
          </a>
          <a href="#" className="text-slate-500 hover:text-blue-900">
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a href="#" className="text-slate-500 hover:text-blue-900">
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg shadow-md p-6 text-white">
        <h3 className="font-bold text-lg mb-2">订阅最新内容</h3>
        <p className="text-blue-100 mb-4">
          获取最新的跨境电商和技术资讯，直接发送到您的邮箱
        </p>
        <form className="space-y-3">
          <div className="relative">
            <input type="email" placeholder="您的邮箱地址" className="w-full px-4 py-2 rounded-md text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <MailIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          </div>
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
            订阅
          </button>
        </form>
      </div>
      {/* Popular Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold text-lg text-slate-800 mb-4">热门文章</h3>
        <div className="space-y-4">
          {popularPosts.map(post => <div key={post.id} className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              <a href="#" className="text-slate-700 hover:text-blue-900 text-sm">
                {post.title}
              </a>
            </div>)}
        </div>
      </div>
      {/* Tags */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold text-lg text-slate-800 mb-4">标签云</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => <a key={tag.name} href="#" className="px-3 py-1 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 rounded-full text-xs">
              {tag.name} ({tag.count})
            </a>)}
        </div>
      </div>
    </aside>;
}