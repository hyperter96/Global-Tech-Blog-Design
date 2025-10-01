import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
export function About() {
  return <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">关于我们</h1>
            <div className="prose max-w-none text-slate-700 dark:text-slate-300">
              <p className="mb-4">
                HyperTeligent
                是一个专注于跨境电商与技术的专业博客平台，致力于为全球电商从业者、独立站卖家、海外市场营销人员和技术开发者提供高质量的内容和洞见。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                我们的使命
              </h2>
              <p className="mb-4">
                我们的使命是通过深入的行业分析、实用的技术教程和前沿的市场洞察，帮助跨境电商从业者在全球市场中取得成功。我们相信，随着全球化的深入发展，跨境电商将继续蓬勃发展，而掌握正确的知识和技能是在这个领域脱颖而出的关键。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                我们的团队
              </h2>
              <p className="mb-4">
                HyperTeligent
                团队由一群热爱跨境电商和技术的专业人士组成。我们的团队成员拥有丰富的行业经验，覆盖电商平台运营、独立站建设、海外营销策略和技术开发等多个领域。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Peter Leow
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    跨境电商顾问 & 技术极客
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    拥有5年跨境电商经验，曾服务于多家知名电商平台，专注于市场趋势分析和战略规划。
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Frank Wu
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">内容策略师</p>
                  <p className="text-slate-700 dark:text-slate-300">
                    前知名媒体编辑，现专注于电商内容创作和SEO优化，致力于提供有深度、有价值的行业内容。
                  </p>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                我们的价值观
              </h2>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li className="text-slate-700 dark:text-slate-300">
                  <strong className="text-blue-700 dark:text-blue-400">专业性</strong> -
                  我们致力于提供基于事实和数据的专业内容，帮助读者做出明智的决策。
                </li>
                <li className="text-slate-700 dark:text-slate-300">
                  <strong className="text-green-700 dark:text-green-400">实用性</strong> -
                  我们的内容注重实践性和可操作性，读者可以立即应用到实际工作中。
                </li>
                <li className="text-slate-700 dark:text-slate-300">
                  <strong className="text-purple-700 dark:text-purple-400">创新性</strong> -
                  我们不断探索行业新趋势和新技术，为读者提供前沿洞察。
                </li>
                <li className="text-slate-700 dark:text-slate-300">
                  <strong className="text-orange-700 dark:text-orange-400">国际视野</strong> -
                  我们关注全球市场动态，帮助中国卖家更好地理解和拓展海外市场。
                </li>
              </ul>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                联系我们
              </h2>
              <p className="mb-4">
                如果您有任何问题、建议或合作意向，欢迎随时与我们联系。您可以通过我们的
                <a href="/contact" className="text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors">
                  联系页面
                </a>
                发送消息，或直接发送邮件至 contact@hyperteligent.com。
              </p>
              <p className="text-slate-600 dark:text-slate-400 italic mt-8">
                感谢您访问
                HyperTeligent。我们期待与您一起探索跨境电商的无限可能！
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>;
}