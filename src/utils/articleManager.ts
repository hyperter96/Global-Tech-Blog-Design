// 文章元数据接口
export interface ArticleMetadata {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
  categoryColor: string;
  tags: string[];
  isHot?: boolean; // 标识是否为热门文章
}

// 完整文章接口（包含内容）
export interface Article extends ArticleMetadata {
  content: string;
}

// 文章文件缓存
let articleFilesCache: string[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

// 动态获取文章文件列表 - 基于实际存在的文件
const getArticleFiles = async (): Promise<string[]> => {
  // 检查缓存是否有效
  const now = Date.now();
  if (articleFilesCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return articleFilesCache;
  }

  // 已知存在的文章列表（基于实际文件）
  const knownArticles = [
    'cross-border-ecommerce-trends-2023.md',
    'independent-website-seo-guide.md', 
    'cross-border-payment-solutions.md',
    'tiktok-shop-operation-guide.md',
    'advanced-cross-border-payment-strategies.md',
    'amazon-fba-new-policy-analysis.md',
    'google-ads-strategy-guide.md',
    'shopify-complete-guide.md'
  ];
  
  // 验证文件是否存在并返回存在的文件路径
  const existingFiles: string[] = [];
  
  const checkResults = await Promise.allSettled(
    knownArticles.map(async (filename) => {
      try {
        const response = await fetch(`/articles/${filename}`, { method: 'HEAD' });
        if (response.ok) {
          return `/articles/${filename}`;
        }
        return null;
      } catch {
        return null;
      }
    })
  );
  
  // 收集所有成功的结果
  checkResults.forEach((result) => {
    if (result.status === 'fulfilled' && result.value) {
      existingFiles.push(result.value);
    }
  });
  
  // 更新缓存
  articleFilesCache = existingFiles;
  cacheTimestamp = now;
  
  return existingFiles;
};

// 手动添加新文章文件（用于开发时快速添加）
export const addArticleFile = (filename: string): void => {
  // 清除缓存，强制重新扫描
  articleFilesCache = null;
  cacheTimestamp = 0;
  
  console.log(`Article file added: ${filename}. Cache cleared.`);
};

// 清除文章文件缓存
export const clearArticleFilesCache = (): void => {
  articleFilesCache = null;
  cacheTimestamp = 0;
};

// 获取已发现的文章文件列表（用于调试）
export const getDiscoveredArticles = async (): Promise<string[]> => {
  return await getArticleFiles();
};

// 验证文章是否存在
export const checkArticleExists = async (id: string): Promise<boolean> => {
  try {
    const filePath = await findArticleFilePath(id);
    return filePath !== null;
  } catch {
    return false;
  }
};

// 获取文章的URL路径（基于文章ID）
export const getArticleUrl = (id: string): string => {
  return `/article/${id}`;
};

// 从URL路径提取文章ID
export const extractArticleIdFromUrl = (url: string): string | null => {
  const match = url.match(/\/article\/([^/?#]+)/);
  return match ? match[1] : null;
};

// 获取所有可访问的文章URL列表
export const getAllArticleUrls = async (): Promise<{ id: string; url: string; title: string }[]> => {
  try {
    const metadata = await getAllArticlesMetadata();
    return metadata.map(article => ({
      id: article.id,
      url: getArticleUrl(article.id),
      title: article.title
    }));
  } catch (error) {
    console.error('Error getting article URLs:', error);
    return [];
  }
};

// 简单的YAML front matter解析器
const parseYamlFrontMatter = (yamlText: string): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  const lines = yamlText.trim().split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;
    
    if (trimmedLine.startsWith('- ')) {
      // 处理数组项（简单实现）
      continue;
    }
    
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmedLine.substring(0, colonIndex).trim();
    const value = trimmedLine.substring(colonIndex + 1).trim();
    
    if (key === 'tags') {
      // 开始收集标签数组
      result[key] = [];
      continue;
    }
    
    // 移除引号
    const cleanValue = value.replace(/^["']|["']$/g, '');
    result[key] = cleanValue;
  }
  
  // 处理标签数组（简单实现）
  if ('tags' in result) {
    const tagsStartIndex = lines.findIndex(line => line.trim().startsWith('tags:'));
    if (tagsStartIndex !== -1) {
      const tags: string[] = [];
      for (let i = tagsStartIndex + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('- ')) {
          tags.push(line.substring(2).trim());
        } else if (line && !line.startsWith(' ')) {
          break;
        }
      }
      result.tags = tags;
    }
  }
  
  return result;
};

// 解析Markdown文件的Front Matter和内容
const parseMarkdownFile = (markdownContent: string): { metadata: ArticleMetadata; content: string } => {
  // 检查是否有front matter
  if (!markdownContent.startsWith('---')) {
    throw new Error('No front matter found in markdown file');
  }
  
  // 找到front matter的结束位置
  const endIndex = markdownContent.indexOf('---', 3);
  if (endIndex === -1) {
    throw new Error('Invalid front matter format');
  }
  
  // 提取front matter和内容
  const frontMatterText = markdownContent.substring(3, endIndex).trim();
  const content = markdownContent.substring(endIndex + 3).trim();
  
  // 解析front matter
  const data = parseYamlFrontMatter(frontMatterText);
  
  // 确保日期格式正确
  const formattedDate = data.date instanceof Date 
    ? data.date.toISOString().split('T')[0]
    : String(data.date || '');

  const metadata: ArticleMetadata = {
    id: String(data.id || ''),
    title: String(data.title || ''),
    summary: String(data.summary || ''),
    category: String(data.category || ''),
    date: formattedDate,
    readTime: String(data.readTime || ''),
    author: String(data.author || ''),
    image: data.image ? String(data.image) : undefined,
    categoryColor: String(data.categoryColor || ''),
    tags: Array.isArray(data.tags) ? data.tags.map(tag => String(tag)) : [],
    isHot: Boolean(data.isHot === true || data.isHot === 'true')
  };

  return { metadata, content };
};

// 根据文章ID智能查找对应的文件路径
const findArticleFilePath = async (id: string): Promise<string | null> => {
  // 首先从已知文章列表中查找
  const articleFiles = await getArticleFiles();
  let filePath = articleFiles.find((path: string) => {
    // 提取文件名（不含扩展名）作为潜在的ID
    const filename = path.split('/').pop()?.replace('.md', '') || '';
    return filename === id || path.includes(id);
  });
  
  if (filePath) {
    return filePath;
  }
  
  // 如果没找到，尝试智能构造可能的文件路径
  const possiblePaths = [
    `/articles/${id}.md`,
    `/articles/${id}`,
    // 尝试一些常见的命名变体
    `/articles/${id}-guide.md`,
    `/articles/${id}-tutorial.md`,
    `/articles/${id}-complete-guide.md`,
    `/articles/${id}-strategies.md`,
    `/articles/${id}-tips.md`,
  ];
  
  for (const path of possiblePaths) {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      if (response.ok) {
        // 将新发现的文章添加到缓存中
        if (articleFilesCache) {
          articleFilesCache.push(path);
        }
        console.log(`Discovered new article: ${path}`);
        return path;
      }
    } catch {
      // 继续尝试下一个路径
    }
  }
  
  return null;
};

// 加载单个文章
export const loadArticle = async (id: string): Promise<Article | null> => {
  try {
    const filePath = await findArticleFilePath(id);
    
    if (!filePath) {
      console.warn(`Article not found for ID: ${id}`);
      return null;
    }

    const response = await fetch(filePath);
    
    if (!response.ok) {
      throw new Error(`Failed to load article: ${response.status} ${response.statusText}`);
    }

    const markdownContent = await response.text();
    const { metadata, content } = parseMarkdownFile(markdownContent);

    // 验证文章ID是否匹配
    if (metadata.id && metadata.id !== id) {
      console.warn(`Article ID mismatch: requested ${id}, found ${metadata.id}`);
    }

    return {
      ...metadata,
      content
    };
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
};

// 加载所有文章的元数据
export const loadAllArticlesMetadata = async (): Promise<ArticleMetadata[]> => {
  try {
    const articles: ArticleMetadata[] = [];
    
    // 获取所有文章文件路径
    const articleFiles = await getArticleFiles();

    for (const filePath of articleFiles) {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          console.warn(`Failed to load article from ${filePath}: ${response.statusText}`);
          continue;
        }

        const markdownContent = await response.text();
        const { metadata } = parseMarkdownFile(markdownContent);
        articles.push(metadata);
      } catch (error) {
        console.warn(`Error parsing article from ${filePath}:`, error);
      }
    }

    // 按热度优先排序，然后按日期排序（最新的在前）
    return articles.sort((a, b) => {
      // 首先按热度排序：热度高的文章优先
      if (a.isHot && !b.isHot) return -1;  // a是热门，b不是，a排前面
      if (!a.isHot && b.isHot) return 1;   // b是热门，a不是，b排前面
      
      // 如果两篇文章热度相同（都是热门或都不是热门），则按时间排序
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error loading articles metadata:', error);
    return [];
  }
};

// 根据ID获取文章元数据（从缓存中获取，如果没有则加载）
let cachedMetadata: ArticleMetadata[] | null = null;

export const getArticleMetadata = async (id: string): Promise<ArticleMetadata | null> => {
  if (!cachedMetadata) {
    cachedMetadata = await loadAllArticlesMetadata();
  }
  
  const metadata = cachedMetadata.find(article => article.id === id);
  return metadata || null;
};

// 获取所有文章元数据（从缓存中获取，如果没有则加载）
export const getAllArticlesMetadata = async (): Promise<ArticleMetadata[]> => {
  if (!cachedMetadata) {
    cachedMetadata = await loadAllArticlesMetadata();
  }
  
  return cachedMetadata;
};

// 清除缓存（在开发环境中可能有用）
export const clearArticlesCache = (): void => {
  cachedMetadata = null;
};

// 标签接口
export interface TagData {
  name: string;
  count: number;
}

// 获取所有标签及其使用次数
export const getAllTags = async (): Promise<TagData[]> => {
  try {
    const metadata = await getAllArticlesMetadata();
    const tagCounts = new Map<string, number>();
    
    // 统计所有标签的使用次数
    metadata.forEach(article => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tag => {
          const trimmedTag = tag.trim();
          if (trimmedTag) {
            tagCounts.set(trimmedTag, (tagCounts.get(trimmedTag) || 0) + 1);
          }
        });
      }
    });
    
    // 转换为数组并按使用次数排序
    const sortedTags = Array.from(tagCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    
    return sortedTags;
  } catch (error) {
    console.error('Error getting all tags:', error);
    return [];
  }
};

// 根据标签名获取相关文章
export const getArticlesByTag = async (tagName: string): Promise<ArticleMetadata[]> => {
  try {
    const metadata = await getAllArticlesMetadata();
    
    return metadata.filter(article => 
      article.tags && 
      Array.isArray(article.tags) && 
      article.tags.some(tag => tag.trim().toLowerCase() === tagName.toLowerCase())
    );
  } catch (error) {
    console.error('Error getting articles by tag:', error);
    return [];
  }
};

// 根据分类名获取相关文章
export const getArticlesByCategory = async (categoryName: string): Promise<ArticleMetadata[]> => {
  try {
    const metadata = await getAllArticlesMetadata();
    
    return metadata.filter(article => 
      article.category && 
      article.category.trim().toLowerCase() === categoryName.toLowerCase()
    );
  } catch (error) {
    console.error('Error getting articles by category:', error);
    return [];
  }
};

// 获取所有分类及其文章数量
export interface CategoryData {
  name: string;
  count: number;
  description?: string;
  color?: string;
  image?: string;
}

export const getAllCategories = async (): Promise<CategoryData[]> => {
  try {
    const metadata = await getAllArticlesMetadata();
    const categoryCounts = new Map<string, number>();
    
    // 统计所有分类的文章数量
    metadata.forEach(article => {
      if (article.category) {
        const trimmedCategory = article.category.trim();
        if (trimmedCategory) {
          categoryCounts.set(trimmedCategory, (categoryCounts.get(trimmedCategory) || 0) + 1);
        }
      }
    });
    
    // 转换为数组并按文章数量排序
    const sortedCategories = Array.from(categoryCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    
    return sortedCategories;
  } catch (error) {
    console.error('Error getting all categories:', error);
    return [];
  }
};