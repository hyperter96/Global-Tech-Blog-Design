// 邮件订阅相关的工具函数和类型定义

export interface SubscriptionData {
  email: string;
  name?: string;
  preferences?: string[];
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  data?: {
    subscriptionId?: string;
    confirmationSent?: boolean;
  };
}

// 模拟的邮件订阅API调用
export const subscribeToNewsletter = async (data: SubscriptionData): Promise<SubscriptionResponse> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // 在实际应用中，这里会发送data到服务器
  console.log('Subscribing user:', data.email);
  
  // 模拟随机成功/失败（90%成功率）
  const success = Math.random() > 0.1;
  
  if (success) {
    // 模拟成功响应
    return {
      success: true,
      message: '订阅成功！欢迎加入我们的邮件列表',
      data: {
        subscriptionId: Date.now().toString(),
        confirmationSent: true
      }
    };
  } else {
    // 模拟失败响应
    return {
      success: false,
      message: '订阅失败，请稍后重试'
    };
  }
};

// 验证邮箱格式
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 获取邮箱域名
export const getEmailDomain = (email: string): string => {
  return email.split('@')[1] || '';
};

// 常见邮箱域名提示
export const getEmailSuggestion = (email: string): string | null => {
  const domain = getEmailDomain(email.toLowerCase());
  const commonDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    '163.com',
    'qq.com',
    '126.com'
  ];
  
  // 如果域名为空或已经是常见域名，不提供建议
  if (!domain || commonDomains.includes(domain)) {
    return null;
  }
  
  // 简单的拼写错误检测和建议
  const suggestions: { [key: string]: string } = {
    'gmai.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmaill.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'outlok.com': 'outlook.com'
  };
  
  return suggestions[domain] || null;
};

// 本地存储订阅状态
export const setSubscriptionStatus = (email: string, status: 'subscribed' | 'unsubscribed'): void => {
  try {
    const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '{}');
    subscriptions[email] = {
      status,
      timestamp: Date.now()
    };
    localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
  } catch (error) {
    console.warn('Failed to save subscription status:', error);
  }
};

// 检查订阅状态
export const getSubscriptionStatus = (email: string): 'subscribed' | 'unsubscribed' | 'unknown' => {
  try {
    const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '{}');
    return subscriptions[email]?.status || 'unknown';
  } catch (error) {
    console.warn('Failed to get subscription status:', error);
    return 'unknown';
  }
};