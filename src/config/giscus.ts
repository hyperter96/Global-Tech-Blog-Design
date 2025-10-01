// Giscus 评论系统配置
// 请到 https://giscus.app/ 配置你的 GitHub 仓库并获取以下配置信息

export const giscusConfig = {
  repo: 'hyperter96/Global-Tech-Blog-Design', // GitHub 仓库
  repoId: 'R_kgDOP5Arfg', // 仓库 ID
  category: 'General', // 讨论分类名称
  categoryId: 'DIC_kwDOP5Arfs4CwGy7', // 分类 ID
  mapping: 'title' as const, // 使用标题映射
  strict: '0', // 严格匹配模式
  reactionsEnabled: '1' as const, // 启用表情反应
  emitMetadata: '0' as const, // 不发出元数据
  inputPosition: 'bottom' as const, // 输入框在底部
  theme: 'cobalt' as const, // 使用 cobalt 主题
  lang: 'zh-CN', // 中文语言
  loading: 'lazy' as const, // 懒加载
};

// 配置说明：
// 1. 到 https://giscus.app/ 网站
// 2. 输入你的 GitHub 仓库信息
// 3. 选择页面 ↔️ discussions 映射关系
// 4. 选择讨论分类
// 5. 选择功能配置
// 6. 复制生成的配置信息到上面的对象中