import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';

export function Disclaimer() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">免责声明</h1>
            <div className="prose max-w-none text-slate-700 dark:text-slate-300">
              <p className="mb-4">最后更新日期：2023年6月1日</p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                网站内容免责声明
              </h2>
              <p className="mb-4">
                HyperTeligent（"我们"、"我们的"或"本网站"）提供的所有信息仅供一般参考之用。我们尽力保持信息最新和准确，但不对其完整性、准确性、可靠性、适用性或可用性作出任何保证或陈述。因此，您依赖此类信息的任何行为完全由您自行承担风险。
              </p>
              <p className="mb-4">
                在法律允许的最大范围内，我们排除所有关于我们网站及其内容的陈述、保证和条件，包括但不限于所有暗示的保证和条件，如适销性、特定用途的适用性、所有权和非侵权。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                专业建议免责声明
              </h2>
              <p className="mb-4">
                本网站上的信息不构成专业建议，也不应被视为此类建议。在采取或不采取任何行动之前，您应该咨询合格的专业人士。
              </p>
              <p className="mb-4">
                特别是，本网站上提供的任何内容均不构成法律、财务、税务、投资或其他形式的专业建议。我们不对您基于本网站上的信息而采取的任何行动负责。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                外部链接免责声明
              </h2>
              <p className="mb-4">
                我们的网站可能包含指向其他网站的链接。这些链接仅为方便和提供进一步信息的目的而提供。它们并不意味着我们认可这些网站。我们对这些链接网站的内容不承担任何责任。
              </p>
              <p className="mb-4">
                在您访问任何链接网站之前，我们建议您查看其条款和条件以及隐私政策。您应该在访问任何链接网站时行使谨慎和良好的判断力。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                用户评论和内容免责声明
              </h2>
              <p className="mb-4">
                我们的网站可能允许用户发布评论、反馈和其他内容。这些内容反映了各个用户的观点和意见，不代表HyperTeligent的观点或意见。
              </p>
              <p className="mb-4">
                我们不对用户生成的内容的准确性、适当性或合法性负责。我们保留删除我们认为违反我们的使用条款或以其他方式不适当的内容的权利，但我们没有义务这样做。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                错误和遗漏免责声明
              </h2>
              <p className="mb-4">
                本网站上的信息可能包含技术、排版或摄影错误。我们不保证网站的任何内容是准确、完整或最新的。我们可能随时更改网站上包含的材料，但不承诺更新材料。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                可用性免责声明
              </h2>
              <p className="mb-4">
                我们不保证本网站将始终可用或不间断运行。我们可能会暂时暂停对网站的访问，恕不另行通知，以进行维护、更新或出于其他原因。我们不对因本网站不可用而导致的任何损失或损害负责。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                责任限制
              </h2>
              <p className="mb-4">
                在法律允许的最大范围内，HyperTeligent及其董事、员工、合作伙伴、代理人、供应商或附属机构在任何情况下均不对任何损失或损害（包括但不限于数据丢失、利润损失或业务中断）负责，这些损失或损害可能因使用或无法使用本网站或本网站上的任何内容或相关网站而直接或间接引起，无论是基于保证、合同、侵权或任何其他法律理论，无论我们是否被告知此类损害的可能性。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                适用法律
              </h2>
              <p className="mb-4">
                本免责声明受中华人民共和国法律管辖，并按其解释。任何与本免责声明相关的争议应提交给中华人民共和国有管辖权的法院。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                免责声明更新
              </h2>
              <p className="mb-4">
                我们可能会不时更新我们的免责声明。我们将通过在此页面上发布新的免责声明来通知您任何更改。我们建议您定期查看此免责声明以了解任何变更。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                联系我们
              </h2>
              <p className="mb-4">
                如果您对我们的免责声明有任何问题或疑虑，请通过以下方式联系我们：
              </p>
              <p className="mb-4">
                电子邮件：legal@hyperteligent.com
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
