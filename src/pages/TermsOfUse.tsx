import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
export function TermsOfUse() {
  return <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">使用条款</h1>
            <div className="prose max-w-none text-slate-700">
              <p className="mb-4">最后更新日期：2023年6月1日</p>
              <p className="mb-4">
                欢迎访问HyperTeligent（"我们"、"我们的"或"本网站"）。以下条款和条件（"条款"）规定了您使用我们网站的条件。请在使用我们的网站之前仔细阅读这些条款。通过访问或使用本网站，您同意受这些条款的约束。如果您不同意这些条款的任何部分，请不要使用我们的网站。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                网站使用
              </h2>
              <p className="mb-4">
                您同意仅将本网站用于合法目的，并以不违反任何适用法律或法规的方式使用。您同意不会：
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>使用本网站从事任何非法或未经授权的活动</li>
                <li>尝试干扰或破坏本网站的正常运行</li>
                <li>规避、禁用或以其他方式干扰与本网站相关的安全功能</li>
                <li>使用自动化程序、机器人或其他方法大量收集内容</li>
                <li>使用本网站传播恶意软件或其他有害代码</li>
                <li>冒充他人或虚假陈述您与任何人或实体的关系</li>
              </ul>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                知识产权
              </h2>
              <p className="mb-4">
                本网站及其原始内容、功能和设计均归HyperTeligent所有，受国际版权、商标、专利、商业秘密和其他知识产权或专有权利法律的保护。
              </p>
              <p className="mb-4">未经我们明确书面许可，您不得：</p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>复制、修改或创建本网站内容的衍生作品</li>
                <li>使用、复制或修改我们的商标、服务标志、产品名称或徽标</li>
                <li>删除本网站上的任何版权或其他专有权利通知</li>
              </ul>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                用户内容
              </h2>
              <p className="mb-4">
                我们的网站可能允许用户发布、链接、存储、共享和以其他方式提供某些信息、文本、图形、视频或其他材料（"用户内容"）。您对您在本网站上或通过本网站提供的任何用户内容完全负责。
              </p>
              <p className="mb-4">通过提供用户内容，您声明并保证：</p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>您拥有或已获得使用和授权我们使用用户内容的所有必要权利</li>
                <li>
                  用户内容不侵犯任何第三方的隐私权、公开权、版权、合同权或任何其他权利
                </li>
                <li>用户内容不包含诽谤、中伤或其他非法材料</li>
              </ul>
              <p className="mb-4">
                我们保留审查、监控和删除我们认为违反这些条款或以其他方式有害的用户内容的权利。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                第三方链接
              </h2>
              <p className="mb-4">
                我们的网站可能包含指向第三方网站或服务的链接，这些网站或服务不由我们拥有或控制。我们对任何第三方网站或服务的内容、隐私政策或实践不承担任何责任。您进一步确认并同意，我们不对您因使用或依赖任何第三方网站或服务的内容、商品或服务而直接或间接遭受的任何损害或损失负责或承担责任。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                免责声明
              </h2>
              <p className="mb-4">
                本网站按"原样"和"可用"的基础提供，不作任何明示或暗示的保证。HyperTeligent不保证本网站将无错误或不间断运行。
              </p>
              <p className="mb-4">
                我们不保证本网站上提供的信息的准确性、完整性或实用性。您同意，您使用或无法使用本网站的风险完全由您自己承担。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                责任限制
              </h2>
              <p className="mb-4">
                在适用法律允许的最大范围内，HyperTeligent及其董事、员工、合作伙伴、代理人、供应商或附属机构在任何情况下均不对任何间接的、附带的、特殊的、后果性的或惩罚性的损害负责，包括但不限于利润损失、数据损失、使用损失、商誉损失或其他无形损失，无论是基于保证、合同、侵权（包括疏忽）、严格责任或任何其他法律理论，无论我们是否被告知此类损害的可能性。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                条款修改
              </h2>
              <p className="mb-4">
                我们保留随时修改或替换这些条款的权利。修改后的条款将在本页面上发布，并在发布时立即生效。您有责任定期查看这些条款。在任何修改后继续使用本网站即表示您接受并同意这些修改。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                适用法律
              </h2>
              <p className="mb-4">
                这些条款应受中华人民共和国法律管辖并按其解释，不考虑其冲突法规定。
              </p>
              <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                联系我们
              </h2>
              <p className="mb-4">
                如果您对这些条款有任何问题或疑虑，请通过以下方式联系我们：
              </p>
              <p className="mb-4">
                电子邮件：terms@hyperteligent.com
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