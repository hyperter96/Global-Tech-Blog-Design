// Giscus 评论系统配置
// 请到 https://giscus.app/ 配置你的 GitHub 仓库并获取以下配置信息

export const giscusConfig = {
  repo: 'your-username/your-repo', // 替换为你的 GitHub 仓库，格式：username/repo-name
  repoId: 'your-repo-id', // 替换为你的仓库 ID，可以在 giscus.app 获取
  category: 'General', // 替换为你的讨论分类名称
  categoryId: 'your-category-id', // 替换为你的分类 ID，可以在 giscus.app 获取
  mapping: 'pathname' as const, // 评论与页面的映射方式
  strict: '0', // 严格匹配模式
  reactionsEnabled: '1' as const, // 是否启用表情反应
  emitMetadata: '0' as const, // 是否发出元数据
  inputPosition: 'bottom' as const, // 输入框位置
  theme: 'preferred_color_scheme' as const, // 主题，支持跟随系统
  lang: 'zh-CN', // 语言
  loading: 'lazy' as const, // 加载方式
};

// 配置说明：
// 1. 到 https://giscus.app/ 网站
// 2. 输入你的 GitHub 仓库信息
// 3. 选择页面 ↔️ discussions 映射关系
// 4. 选择讨论分类
// 5. 选择功能配置
// 6. 复制生成的配置信息到上面的对象中