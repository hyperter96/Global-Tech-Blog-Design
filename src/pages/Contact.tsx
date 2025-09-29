import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, CheckIcon } from 'lucide-react';
export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after submission
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      // Reset success message after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  return <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
              联系我们
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MailIcon className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  电子邮件
                </h3>
                <p className="text-slate-600">contact@hyperteligent.com</p>
                <p className="text-slate-600">support@hyperteligent.com</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <PhoneIcon className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  电话
                </h3>
                <p className="text-slate-600">+86 123 4567 8910</p>
                <p className="text-slate-600">周一至周五: 9:00 - 18:00</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MapPinIcon className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  地址
                </h3>
                <p className="text-slate-600">上海市浦东新区</p>
                <p className="text-slate-600">张江高科技园区</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                  发送消息
                </h2>
                {isSubmitted ? <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start mb-6">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <p className="text-green-800">
                      感谢您的留言！我们已收到您的消息，将尽快回复您。
                    </p>
                  </div> : error ? <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                    <p className="text-red-800">{error}</p>
                  </div> : null}
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        姓名
                      </label>
                      <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        电子邮件
                      </label>
                      <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                      主题
                    </label>
                    <select id="subject" name="subject" value={formState.subject} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">请选择主题...</option>
                      <option value="general">一般咨询</option>
                      <option value="support">技术支持</option>
                      <option value="business">商务合作</option>
                      <option value="feedback">意见反馈</option>
                      <option value="other">其他</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                      消息内容
                    </label>
                    <textarea id="message" name="message" value={formState.message} onChange={handleChange} required rows={6} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                  </div>
                  <div>
                    <button type="submit" disabled={isSubmitting} className={`flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-900 text-white rounded-md font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}>
                      {isSubmitting ? <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          发送中...
                        </> : <>
                          <SendIcon className="h-5 w-5 mr-2" />
                          发送消息
                        </>}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}