import React from 'react';
import { ClockIcon, UserIcon } from 'lucide-react';
interface ArticleCardProps {
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
  categoryColor: string;
}
export function ArticleCard({
  title,
  summary,
  category,
  date,
  readTime,
  author,
  image,
  categoryColor
}: ArticleCardProps) {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      {image && <div className="aspect-w-16 aspect-h-9">
          <img src={image} alt={title} className="object-cover w-full h-48" />
        </div>}
      <div className="p-6">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColor}`}>
          {category}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-600 mb-4">{summary}</p>
        <div className="flex items-center text-sm text-slate-500 mb-4">
          <div className="flex items-center mr-4">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-4 w-4 mr-1" />
            <span>{author}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">{date}</span>
          <button className="text-blue-900 hover:text-orange-500 font-medium text-sm">
            阅读更多
          </button>
        </div>
      </div>
    </div>;
}