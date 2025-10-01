import React, { useState } from 'react';
import { MailIcon, CheckIcon, AlertTriangleIcon, LightbulbIcon } from 'lucide-react';
import { 
  subscribeToNewsletter, 
  validateEmail, 
  getEmailSuggestion,
  setSubscriptionStatus,
  getSubscriptionStatus
} from '../utils/newsletter';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // 检查邮箱建议
    if (newEmail.includes('@')) {
      const suggestion = getEmailSuggestion(newEmail);
      setEmailSuggestion(suggestion);
    } else {
      setEmailSuggestion(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证邮箱格式
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('请输入有效的邮箱地址');
      return;
    }

    // 检查是否已经订阅过
    const currentStatus = getSubscriptionStatus(email);
    if (currentStatus === 'subscribed') {
      setStatus('error');
      setMessage('该邮箱已经订阅过了');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await subscribeToNewsletter({ email });
      
      if (response.success) {
        setStatus('success');
        setMessage(response.message);
        setSubscriptionStatus(email, 'subscribed');
        setEmail('');
        setEmailSuggestion(null);
        
        // 5秒后重置状态
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(response.message);
        
        // 3秒后重置状态
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 3000);
      }
      
    } catch {
      setStatus('error');
      setMessage('订阅失败，请稍后重试');
      
      // 3秒后重置状态
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  const applySuggestion = () => {
    if (emailSuggestion) {
      const [localPart] = email.split('@');
      setEmail(`${localPart}@${emailSuggestion}`);
      setEmailSuggestion(null);
    }
  };

  return (
    <div className="newsletter-section bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500 rounded-lg">
          <MailIcon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
          邮件订阅
        </h3>
      </div>
      
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
        订阅我们的邮件，第一时间获取最新的跨境电商资讯和技术分享
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="输入您的邮箱地址"
            disabled={status === 'loading'}
            className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        
        {/* 邮箱建议 */}
        {emailSuggestion && (
          <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <LightbulbIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-yellow-700 dark:text-yellow-300">
                您是想输入 
              </span>
              <button
                type="button"
                onClick={applySuggestion}
                className="font-medium text-yellow-800 dark:text-yellow-200 underline hover:no-underline"
              >
                {email.split('@')[0]}@{emailSuggestion}
              </button>
              <span className="text-yellow-700 dark:text-yellow-300">吗？</span>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          disabled={status === 'loading' || !email.trim()}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>订阅中...</span>
            </>
          ) : (
            <>
              <MailIcon className="h-4 w-4" />
              <span>订阅更新</span>
            </>
          )}
        </button>
      </form>

      {/* 状态消息 */}
      {message && (
        <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 text-sm ${
          status === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
            : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
        }`}>
          {status === 'success' ? (
            <CheckIcon className="h-4 w-4 flex-shrink-0" />
          ) : (
            <AlertTriangleIcon className="h-4 w-4 flex-shrink-0" />
          )}
          <span>{message}</span>
        </div>
      )}
      
      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        我们承诺不会发送垃圾邮件，您可以随时取消订阅
      </div>
    </div>
  );
}