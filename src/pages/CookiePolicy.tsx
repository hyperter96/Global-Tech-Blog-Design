import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
export function CookiePolicy() {
  return <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">
              Cookie 政策
            </h1>
            <div className="prose max-w-none text-slate-700">
              <p className="mb-4">最后更新日期：2023年6月1日</p>
              <p className="mb-4">
                本Cookie政策解释了HyperTeligent（"我们"、"我们的"或"本网站"）如何使用Cookie和类似技术来识别您在访问我们的网站时。它解释了这些技术是什么，为什么我们使用它们，以及您如何控制我们对它们的使用。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                什么是Cookie？
              </h2>
              <p className="mb-4">
                Cookie是一个小型文本文件，当您访问网站时，网站会将其放置在您的计算机或移动设备上。Cookie被广泛用于使网站正常工作或更高效地工作，以及为网站所有者提供信息。
              </p>
              <p className="mb-4">
                Cookie可以是"持久性"或"会话"Cookie。持久性Cookie在您的计算机上保留一段时间，而会话Cookie在您关闭浏览器后删除。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                我们如何使用Cookie？
              </h2>
              <p className="mb-4">我们使用不同类型的Cookie来运行我们的网站：</p>
              <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">
                必要Cookie
              </h3>
              <p className="mb-4">
                这些Cookie对于向您提供我们网站上可用的服务以及使您能够使用某些功能是必不可少的。没有这些Cookie，我们无法提供您所请求的某些服务。这些Cookie不收集关于您的任何信息，可用于营销目的或记住您在互联网上浏览的位置。
              </p>
              <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">
                功能性Cookie
              </h3>
              <p className="mb-4">
                这些Cookie使我们能够记住您在我们网站上所做的选择（如您的语言或您所在的地区）并提供增强的、更个性化的功能。这些Cookie还可用于记住您对文本大小、字体和网页其他可自定义部分的更改。
              </p>
              <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">
                分析Cookie
              </h3>
              <p className="mb-4">
                这些Cookie收集有关访问者如何使用网站的信息，例如访问者最常访问哪些页面以及他们是否从网页上收到错误消息。这些Cookie不收集识别访问者的信息。这些Cookie收集的所有信息都是汇总的，因此是匿名的。它们仅用于改进网站的运作方式。
              </p>
              <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">
                广告Cookie
              </h3>
              <p className="mb-4">
                这些Cookie用于根据您的兴趣向您展示广告。它们还用于限制您看到广告的次数，以及帮助衡量广告活动的有效性。它们通常由广告网络在网站运营商的许可下放置。它们记住您已访问过某个网站，并且这些信息可能与其他组织（如广告商）共享。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                第三方Cookie
              </h2>
              <p className="mb-4">
                在某些特殊情况下，我们还使用由受信任的第三方提供的Cookie。以下部分详细说明了您可能在本网站上遇到的第三方Cookie。
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>
                  本网站使用Google
                  Analytics，这是互联网上最广泛使用的分析解决方案之一，帮助我们了解您如何使用网站以及我们如何改进您的体验。这些Cookie可能会跟踪您在网站上花费的时间、您访问的页面以及您来自哪里等事项。
                </li>
                <li>
                  我们还使用社交媒体按钮和/或插件，允许您通过各种社交网络工具连接到您的社交网络。为了使这些工作，社交媒体网站（包括Facebook、Twitter、LinkedIn等）将设置Cookie通过我们的网站，这些Cookie可能用于增强您的个人资料或为其广告目的贡献数据。
                </li>
              </ul>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                控制Cookie
              </h2>
              <p className="mb-4">您可以通过以下方式控制和/或删除Cookie：</p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>
                  <strong>浏览器设置</strong>
                  ：大多数互联网浏览器都设计为自动接受Cookie。但是，您可以通过更改浏览器设置来阻止Cookie或删除已存储的Cookie。
                </li>
                <li>
                  <strong>我们的Cookie同意工具</strong>
                  ：您可以使用我们网站底部的Cookie横幅来管理您的Cookie偏好。
                </li>
                <li>
                  <strong>第三方工具</strong>：您可以使用如Ghostery或Privacy
                  Badger等浏览器插件来控制特定类型的Cookie。
                </li>
              </ul>
              <p className="mb-4">
                请注意，如果您选择禁用Cookie，您可能无法使用我们网站的某些功能。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                更多信息
              </h2>
              <p className="mb-4">
                如果您想了解更多关于Cookie的信息，请访问
                <a href="https://www.allaboutcookies.org/" className="text-blue-900 hover:underline" target="_blank" rel="noopener noreferrer">
                  www.allaboutcookies.org
                </a>
                或
                <a href="https://www.aboutcookies.org/" className="text-blue-900 hover:underline" target="_blank" rel="noopener noreferrer">
                  www.aboutcookies.org
                </a>
                。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                Cookie政策更新
              </h2>
              <p className="mb-4">
                我们可能会不时更新我们的Cookie政策。我们将通过在此页面上发布新的Cookie政策来通知您任何更改。我们建议您定期查看此Cookie政策以了解任何变更。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                联系我们
              </h2>
              <p className="mb-4">
                如果您对我们的Cookie政策有任何问题或疑虑，请通过以下方式联系我们：
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
    </div>;
}