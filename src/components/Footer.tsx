import { MailIcon, PhoneIcon, MapPinIcon, ArrowUpIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">HyperTeligent</h3>
            <p className="mb-4">
              专注于跨境电商与技术的前沿博客，提供深度分析、实用教程和行业洞见。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white">
                {/* X (Twitter) Icon */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://t.me/hyperteligent" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                {/* Telegram Icon */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white">
                  分类
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  关于
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  联系
                </Link>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">法律信息</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:text-white">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="hover:text-white">
                  使用条款
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-white">
                  Cookie政策
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white">
                  免责声明
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MailIcon className="h-5 w-5 mr-3 text-blue-400 mt-0.5" />
                <span>contact@hyperteligent.com</span>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="h-5 w-5 mr-3 text-blue-400 mt-0.5" />
                <span>+86 123 4567 8910</span>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-3 text-blue-400 mt-0.5" />
                <span>上海市浦东新区张江高科技园区</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="bg-slate-950 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2023 HyperTeligent. 保留所有权利。</p>
          <button onClick={scrollToTop} className="mt-4 md:mt-0 flex items-center text-sm text-slate-400 hover:text-white">
            回到顶部 <ArrowUpIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </footer>;
}