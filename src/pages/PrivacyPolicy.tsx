import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
export function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">隐私政策</h1>
            <div className="prose max-w-none text-slate-700 dark:text-slate-300">
              <p className="mb-4">最后更新日期：2023年6月1日</p>
              <p className="mb-4">
                HyperTeligent（"我们"、"我们的"或"本网站"）重视您的隐私。本隐私政策旨在说明我们如何收集、使用、披露和保护您在访问我们的网站时提供的个人信息。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                信息收集
              </h2>
              <p className="mb-4">我们可能会收集以下类型的个人信息：</p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>
                  <strong>个人识别信息</strong>
                  ：包括姓名、电子邮件地址、电话号码、邮寄地址等，这些信息是您在注册账户、订阅我们的通讯、填写联系表单或参与调查时自愿提供的。
                </li>
                <li>
                  <strong>非个人识别信息</strong>
                  ：包括浏览器类型、设备类型、IP地址、引荐URL、访问时间等。
                </li>
                <li>
                  <strong>Cookie和类似技术</strong>
                  ：我们使用Cookie和类似技术来跟踪网站活动并保存某些信息。
                </li>
              </ul>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                信息使用
              </h2>
              <p className="mb-4">我们可能会将收集到的信息用于以下目的：</p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>提供、维护和改进我们的网站和服务</li>
                <li>处理和完成您的交易</li>
                <li>发送您请求的信息或产品</li>
                <li>发送管理信息，如关于我们网站的变更通知</li>
                <li>发送营销和促销通讯（如果您已选择接收）</li>
                <li>回应您的评论、问题和请求</li>
                <li>监控和分析网站使用趋势和偏好</li>
                <li>检测、预防和解决技术问题</li>
              </ul>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                信息共享
              </h2>
              <p className="mb-4">
                我们不会出售、交易或以其他方式转让您的个人识别信息给外部方。这不包括我们信任的、协助我们运营网站或为您提供服务的第三方，前提是这些方同意对这些信息保密。在以下情况下，我们可能会披露您的信息：
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>遵守法律要求、法规或法院命令</li>
                <li>保护我们的权利和财产</li>
                <li>在紧急情况下保护HyperTeligent或公众的安全</li>
                <li>防止非法活动或涉嫌非法活动</li>
              </ul>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                数据安全
              </h2>
              <p className="mb-4">
                我们采取合理的安全措施来保护您的个人信息不被未经授权的访问、使用或披露。然而，请注意，互联网传输方法和电子存储不是100%安全的。虽然我们努力使用商业上可接受的方式来保护您的个人信息，但我们不能保证其绝对安全。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                Cookie政策
              </h2>
              <p className="mb-4">
                Cookie是放置在您设备上的小型文本文件，用于记录您的信息和活动。我们使用Cookie来改善您的体验，了解用户如何与我们的网站互动，以及提供个性化内容和广告。您可以通过浏览器设置控制Cookie。请注意，禁用Cookie可能会影响我们网站的功能。详细信息请参阅我们的
                <a href="/cookie-policy" className="text-blue-900 dark:text-blue-400 hover:underline">
                  Cookie政策
                </a>
                。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                第三方链接
              </h2>
              <p className="mb-4">
                我们的网站可能包含指向第三方网站的链接。我们对这些第三方网站的内容或隐私政策不负责任。我们鼓励用户在离开我们的网站时阅读第三方网站的隐私声明。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                儿童隐私
              </h2>
              <p className="mb-4">
                我们的网站不针对13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。如果您是父母或监护人，并且您认为您的孩子向我们提供了个人信息，请联系我们，我们将从我们的记录中删除这些信息。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                您的权利
              </h2>
              <p className="mb-4">
                根据您所在地区的适用法律，您可能拥有以下权利：
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>访问我们持有的关于您的个人信息</li>
                <li>要求更正不准确或不完整的个人信息</li>
                <li>要求删除您的个人信息</li>
                <li>反对我们处理您的个人信息</li>
                <li>要求限制处理您的个人信息</li>
                <li>数据可携带性</li>
              </ul>
              <p className="mb-4">
                如果您想行使任何这些权利，请通过contact@hyperteligent.com与我们联系。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                隐私政策更新
              </h2>
              <p className="mb-4">
                我们可能会不时更新我们的隐私政策。我们将通过在此页面上发布新的隐私政策来通知您任何更改。我们建议您定期查看此隐私政策以了解任何变更。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                联系我们
              </h2>
              <p className="mb-4">
                如果您对我们的隐私政策有任何问题或疑虑，请通过以下方式联系我们：
              </p>
              <p className="mb-4">
                电子邮件：privacy@hyperteligent.com
                <br />
                电话：+86 123 4567 8910
                <br />
                地址：上海市浦东新区张江高科技园区
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
