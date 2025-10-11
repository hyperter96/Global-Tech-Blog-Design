import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CheckCircle, XCircle, RefreshCw, Download } from 'lucide-react';

interface Proxy {
  id: string;
  ip: string;
  port: string;
  country: string;
  protocol: string;
  anonymity: string;
  speed: string;
  uptime: string;
  lastChecked: string;
}

// 模拟代理数据
const mockProxies: Proxy[] = Array.from({ length: 50 }, (_, i) => ({
  id: `proxy-${i + 1}`,
  ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  port: `${3000 + Math.floor(Math.random() * 6000)}`,
  country: ['美国', '日本', '新加坡', '德国', '英国', '香港', '韩国'][Math.floor(Math.random() * 7)],
  protocol: ['HTTP', 'HTTPS', 'SOCKS4', 'SOCKS5'][Math.floor(Math.random() * 4)],
  anonymity: ['高匿', '匿名', '透明'][Math.floor(Math.random() * 3)],
  speed: `${(Math.random() * 500 + 50).toFixed(0)}ms`,
  uptime: `${(Math.random() * 30 + 70).toFixed(1)}%`,
  lastChecked: `${Math.floor(Math.random() * 60)}分钟前`
}));

export function FreeProxy() {
  const [activeTab, setActiveTab] = useState<'list' | 'check'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [proxyToCheck, setProxyToCheck] = useState('');
  const [batchProxies, setBatchProxies] = useState('');
  const [checkMode, setCheckMode] = useState<'single' | 'batch'>('single');
  const [checkResults, setCheckResults] = useState<Array<{ proxy: string; status: 'success' | 'error'; message: string; details?: string }>>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockProxies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProxies = mockProxies.slice(startIndex, startIndex + itemsPerPage);

  // 模拟代理列表加载
  useEffect(() => {
    if (activeTab === 'list') {
      setIsLoadingList(true);
      const timer = setTimeout(() => {
        setIsLoadingList(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeTab, currentPage]);

  // 解析代理格式
  const parseProxy = (proxyStr: string): { ip: string; port: string; username?: string; password?: string } | null => {
    const parts = proxyStr.trim().split(':');
    if (parts.length === 2) {
      return { ip: parts[0], port: parts[1] };
    } else if (parts.length === 4) {
      return { ip: parts[0], port: parts[1], username: parts[2], password: parts[3] };
    }
    return null;
  };

  // 单个代理检测
  const handleProxyCheck = async () => {
    if (!proxyToCheck.trim()) return;
    
    const parsed = parseProxy(proxyToCheck);
    if (!parsed) {
      setCheckResults([{
        proxy: proxyToCheck,
        status: 'error',
        message: '代理格式不正确，请使用 IP:端口 或 IP:端口:用户名:密码 格式'
      }]);
      return;
    }

    setIsChecking(true);
    setCheckResults([]);
    
    // 模拟检测过程
    setTimeout(() => {
      const isValid = Math.random() > 0.3;
      const hasAuth = parsed.username && parsed.password;
      setCheckResults([{
        proxy: proxyToCheck,
        status: isValid ? 'success' : 'error',
        message: isValid 
          ? `代理可用！响应时间: ${Math.floor(Math.random() * 500 + 100)}ms` 
          : '代理不可用或超时',
        details: hasAuth ? `认证方式: 用户名密码 (${parsed.username})` : '无需认证'
      }]);
      setIsChecking(false);
    }, 2000);
  };

  // 批量代理检测
  const handleBatchCheck = async () => {
    if (!batchProxies.trim()) return;
    
    const proxies = batchProxies.split('\n').filter(p => p.trim());
    if (proxies.length === 0) return;

    setIsChecking(true);
    setCheckResults([]);
    
    // 模拟批量检测
    const results: Array<{ proxy: string; status: 'success' | 'error'; message: string; details?: string }> = [];
    
    for (let i = 0; i < proxies.length; i++) {
      const proxyStr = proxies[i].trim();
      const parsed = parseProxy(proxyStr);
      
      if (!parsed) {
        results.push({
          proxy: proxyStr,
          status: 'error',
          message: '格式错误'
        });
        continue;
      }

      // 模拟延迟检测
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const isValid = Math.random() > 0.4;
      const hasAuth = parsed.username && parsed.password;
      results.push({
        proxy: proxyStr,
        status: isValid ? 'success' : 'error',
        message: isValid 
          ? `${Math.floor(Math.random() * 500 + 100)}ms` 
          : '超时',
        details: hasAuth ? `认证: ${parsed.username}` : '无认证'
      });
      
      setCheckResults([...results]);
    }
    
    setIsChecking(false);
  };

  const exportProxies = () => {
    const content = currentProxies.map(p => `${p.ip}:${p.port}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proxies.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              免费代理工具
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              获取免费的HTTP/HTTPS/SOCKS代理，支持代理检测
            </p>
          </div>

          {/* Tab 切换 */}
          <div className="flex space-x-2 mb-6 border-b border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'list'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              免费代理列表
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
              代理检测
            </button>
          </div>

          {/* Tab 内容 */}
          {activeTab === 'list' ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
              {/* 操作栏 */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  共 {mockProxies.length} 个代理
                </div>
                <button
                  type="button"
                  onClick={exportProxies}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  导出当前页
                </button>
              </div>

              {/* 代理列表表格 */}
              <div className="overflow-x-auto relative min-h-[500px]">
                {isLoadingList ? (
                  /* 加载动画 */
                  <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-800">
                    <div className="flex flex-col items-center gap-4">
                      {/* 旋转加载器 */}
                      <div className="relative w-12 h-12">
                        <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-500 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
                      </div>
                      {/* 加载文本 */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">正在加载代理列表</span>
                        <div className="flex gap-1">
                          <span className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">IP地址</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">端口</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">国家</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">协议</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">匿名度</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">速度</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">可用率</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">最后检测</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {currentProxies.map((proxy) => (
                        <tr key={proxy.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors animate-fadeIn">
                          <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100 font-mono">{proxy.ip}</td>
                          <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 font-mono">{proxy.port}</td>
                          <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{proxy.country}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-medium">
                              {proxy.protocol}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              proxy.anonymity === '高匿' 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                : proxy.anonymity === '匿名'
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                            }`}>
                              {proxy.anonymity}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{proxy.speed}</td>
                          <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{proxy.uptime}</td>
                          <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{proxy.lastChecked}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* 分页 */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  第 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, mockProxies.length)} 条，共 {mockProxies.length} 条
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    上一页
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg text-sm ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    下一页
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                代理可用性检测
              </h2>
              
              {/* 检测模式切换 */}
              <div className="flex gap-3 mb-6 border-b border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setCheckMode('single')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    checkMode === 'single'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  单个检测
                </button>
                <button
                  type="button"
                  onClick={() => setCheckMode('batch')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    checkMode === 'batch'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  批量检测
                </button>
              </div>

              {checkMode === 'single' ? (
                <>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    输入代理地址，支持格式：<code className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">IP:端口</code> 或 <code className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">IP:端口:用户名:密码</code>
                  </p>
                  
                  <div className="flex gap-3 mb-6">
                    <input
                      type="text"
                      value={proxyToCheck}
                      onChange={(e) => setProxyToCheck(e.target.value)}
                      placeholder="例如: 192.168.1.1:8080 或 192.168.1.1:8080:user:pass"
                      className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => e.key === 'Enter' && handleProxyCheck()}
                    />
                    <button
                      type="button"
                      onClick={handleProxyCheck}
                      disabled={isChecking || !proxyToCheck.trim()}
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
                </>
              ) : (
                <>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    每行输入一个代理地址，支持两种格式
                  </p>
                  
                  <textarea
                    value={batchProxies}
                    onChange={(e) => setBatchProxies(e.target.value)}
                    placeholder={`192.168.1.1:8080\n192.168.1.2:3128:username:password\n192.168.1.3:1080`}
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm mb-4 custom-scrollbar"
                  />
                  
                  <button
                    type="button"
                    onClick={handleBatchCheck}
                    disabled={isChecking || !batchProxies.trim()}
                    className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isChecking ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        批量检测中...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        开始批量检测
                      </>
                    )}
                  </button>
                </>
              )}

              {/* 检测结果 */}
              {checkResults.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    检测结果 ({checkResults.filter(r => r.status === 'success').length}/{checkResults.length} 可用)
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    {checkResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          result.status === 'success'
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {result.status === 'success' ? (
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`font-mono text-sm font-medium ${
                              result.status === 'success'
                                ? 'text-green-900 dark:text-green-100'
                                : 'text-red-900 dark:text-red-100'
                            }`}>
                              {result.proxy}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <p className={`text-sm ${
                                result.status === 'success'
                                  ? 'text-green-700 dark:text-green-300'
                                  : 'text-red-700 dark:text-red-300'
                              }`}>
                                {result.message}
                              </p>
                              {result.details && (
                                <span className={`text-xs px-2 py-0.5 rounded ${
                                  result.status === 'success'
                                    ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                                    : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                                }`}>
                                  {result.details}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 使用提示 */}
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  使用提示
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• 支持两种格式：<code className="px-1 bg-blue-100 dark:bg-blue-900/40 rounded">IP:端口</code> 或 <code className="px-1 bg-blue-100 dark:bg-blue-900/40 rounded">IP:端口:用户名:密码</code></li>
                  <li>• 批量检测时每行输入一个代理地址</li>
                  <li>• 检测过程可能需要一些时间，请耐心等待</li>
                  <li>• 建议使用高匿代理以保护隐私</li>
                  <li>• 免费代理稳定性较差，建议定期更换</li>
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
