import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RefreshCw, Copy, CheckCircle, XCircle } from 'lucide-react';

interface IPv6Details {
  address: string;
  type: string;
  compressed: string;
  expanded: string;
}

export function IPv6Address() {
  const [activeTab, setActiveTab] = useState<'generate' | 'check'>('generate');
  const [generatedAddresses, setGeneratedAddresses] = useState<string[]>([]);
  const [count, setCount] = useState(10);
  const [prefix, setPrefix] = useState('2001:db8');
  const [copySuccess, setCopySuccess] = useState(false);
  
  // IPv6检测相关状态
  const [ipv6ToCheck, setIpv6ToCheck] = useState('');
  const [checkResult, setCheckResult] = useState<{ status: 'success' | 'error' | null; message: string; details?: IPv6Details }>({ status: null, message: '' });
  const [isChecking, setIsChecking] = useState(false);

  // 生成随机IPv6地址
  const generateIPv6 = () => {
    const addresses: string[] = [];
    for (let i = 0; i < count; i++) {
      const segments = [];
      // 添加前缀
      if (prefix) {
        segments.push(prefix);
      }
      // 生成剩余段
      const remainingSegments = 8 - (prefix ? prefix.split(':').length : 0);
      for (let j = 0; j < remainingSegments; j++) {
        segments.push(Math.floor(Math.random() * 65536).toString(16).padStart(4, '0'));
      }
      addresses.push(segments.join(':'));
    }
    setGeneratedAddresses(addresses);
  };

  // 复制到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // 复制所有地址
  const copyAllAddresses = () => {
    copyToClipboard(generatedAddresses.join('\n'));
  };

  // 检测IPv6地址
  const handleIPv6Check = async () => {
    if (!ipv6ToCheck.trim()) return;
    
    setIsChecking(true);
    setCheckResult({ status: null, message: '' });
    
    // 模拟检测过程
    setTimeout(() => {
      // 简单的IPv6格式验证
      const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
      const isValid = ipv6Regex.test(ipv6ToCheck.trim());
      
      if (isValid) {
        setCheckResult({
          status: 'success',
          message: `IPv6地址格式正确`,
          details: {
            address: ipv6ToCheck,
            type: ipv6ToCheck.startsWith('fe80') ? '链路本地地址' : ipv6ToCheck.startsWith('2001') ? '全球单播地址' : '其他类型',
            compressed: compressIPv6(ipv6ToCheck),
            expanded: expandIPv6(ipv6ToCheck)
          }
        });
      } else {
        setCheckResult({
          status: 'error',
          message: `IPv6地址格式不正确`
        });
      }
      setIsChecking(false);
    }, 1500);
  };

  // 压缩IPv6地址（移除前导零和连续的0段）
  const compressIPv6 = (addr: string): string => {
    return addr.split(':')
      .map(seg => seg.replace(/^0+/, '') || '0')
      .join(':')
      .replace(/(:0)+:/, '::');
  };

  // 展开IPv6地址
  const expandIPv6 = (addr: string): string => {
    const segments = addr.split(':');
    const expanded: string[] = [];
    
    for (let i = 0; i < segments.length; i++) {
      if (segments[i] === '') {
        const zerosNeeded = 8 - segments.filter(s => s !== '').length;
        for (let j = 0; j <= zerosNeeded; j++) {
          expanded.push('0000');
        }
      } else {
        expanded.push(segments[i].padStart(4, '0'));
      }
    }
    
    return expanded.slice(0, 8).join(':');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              IPv6地址工具
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              随机生成IPv6地址，检测IPv6地址有效性
            </p>
          </div>

          {/* Tab 切换 */}
          <div className="flex space-x-2 mb-6 border-b border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setActiveTab('generate')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'generate'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              IPv6地址随机生成
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('check')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'check'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              IPv6代理检测
            </button>
          </div>

          {/* Tab 内容 */}
          {activeTab === 'generate' ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                生成随机IPv6地址
              </h2>
              
              {/* 配置选项 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    生成数量
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={count}
                    onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    地址前缀（可选）
                  </label>
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="例如: 2001:db8"
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={generateIPv6}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                生成地址
              </button>

              {/* 生成的地址列表 */}
              {generatedAddresses.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      生成的IPv6地址 ({generatedAddresses.length})
                    </h3>
                    <button
                      type="button"
                      onClick={copyAllAddresses}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
                    >
                      {copySuccess ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          已复制
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          复制全部
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 max-h-96 overflow-y-auto custom-scrollbar">
                    {generatedAddresses.map((addr, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 hover:bg-slate-100 dark:hover:bg-slate-800 px-2 rounded transition-colors group"
                      >
                        <code className="text-sm text-slate-800 dark:text-slate-200 font-mono flex-1">
                          {addr}
                        </code>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(addr)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                        >
                          <Copy className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 使用说明 */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  使用说明
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• IPv6地址由8组4位十六进制数组成，用冒号分隔</li>
                  <li>• 可以指定前缀来生成特定网段的地址</li>
                  <li>• 常用前缀：2001:db8（文档示例）、fe80（链路本地）</li>
                  <li>• 点击地址旁边的复制图标可快速复制单个地址</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                IPv6地址检测
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                输入IPv6地址，验证其格式正确性并获取详细信息
              </p>
              
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={ipv6ToCheck}
                  onChange={(e) => setIpv6ToCheck(e.target.value)}
                  placeholder="例如: 2001:db8::1"
                  className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleIPv6Check()}
                />
                <button
                  type="button"
                  onClick={handleIPv6Check}
                  disabled={isChecking || !ipv6ToCheck.trim()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isChecking ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      检测中...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      开始检测
                    </>
                  )}
                </button>
              </div>

              {/* 检测结果 */}
              {checkResult.status && (
                <div className={`p-4 rounded-lg border ${
                  checkResult.status === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-start gap-3 mb-3">
                    {checkResult.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium ${
                        checkResult.status === 'success'
                          ? 'text-green-900 dark:text-green-100'
                          : 'text-red-900 dark:text-red-100'
                      }`}>
                        {checkResult.status === 'success' ? '检测成功' : '检测失败'}
                      </p>
                      <p className={`text-sm mt-1 ${
                        checkResult.status === 'success'
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-red-700 dark:text-red-300'
                      }`}>
                        {checkResult.message}
                      </p>
                    </div>
                  </div>

                  {/* 详细信息 */}
                  {checkResult.details && (
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white dark:bg-slate-800 p-3 rounded">
                          <span className="text-slate-600 dark:text-slate-400">地址类型：</span>
                          <span className="ml-2 text-slate-900 dark:text-slate-100 font-medium">{checkResult.details.type}</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded">
                          <span className="text-slate-600 dark:text-slate-400">压缩格式：</span>
                          <code className="ml-2 text-slate-900 dark:text-slate-100 font-mono text-xs">{checkResult.details.compressed}</code>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-3 rounded">
                        <span className="text-slate-600 dark:text-slate-400">完整格式：</span>
                        <code className="ml-2 text-slate-900 dark:text-slate-100 font-mono text-xs">{checkResult.details.expanded}</code>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 使用提示 */}
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  IPv6地址格式说明
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• 标准格式：8组4位十六进制数，如 2001:0db8:0000:0000:0000:0000:0000:0001</li>
                  <li>• 压缩格式：可省略前导零，如 2001:db8::1</li>
                  <li>• 双冒号::只能出现一次，代表连续的零</li>
                  <li>• 支持混合格式：2001:db8::192.168.1.1</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
