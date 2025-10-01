# Giscus 评论系统配置指南

本项目使用 [Giscus](https://giscus.app/) 作为评论系统，它是一个基于 GitHub Discussions 的评论系统。

## 配置步骤

### 1. 准备 GitHub 仓库

确保你的 GitHub 仓库满足以下条件：
- 仓库是公开的
- 已启用 Discussions 功能（在仓库的 Settings > Features 中启用）
- 已安装 giscus GitHub App（https://github.com/apps/giscus）

### 2. 获取配置信息

1. 访问 [giscus.app](https://giscus.app/)
2. 在 "仓库" 部分输入你的仓库信息（格式：`username/repo-name`）
3. 选择页面 ↔️ discussions 映射关系（推荐选择 "pathname"）
4. 选择讨论分类（建议创建一个专门的 "Comments" 分类）
5. 选择功能配置（根据需要开启表情反应等功能）

### 3. 更新配置文件

将从 giscus.app 获取的配置信息更新到 `src/config/giscus.ts` 文件中：

```typescript
export const giscusConfig = {
  repo: 'your-username/your-repo', // 你的仓库，例如：'octocat/Hello-World'
  repoId: 'R_kgDOHd-29g', // 你的仓库 ID
  category: 'General', // 讨论分类名称
  categoryId: 'DIC_kwDOHd-29c4CQs_5', // 分类 ID
  mapping: 'pathname' as const,
  strict: '0',
  reactionsEnabled: '1' as const,
  emitMetadata: '0' as const,
  inputPosition: 'bottom' as const,
  theme: 'preferred_color_scheme' as const,
  lang: 'zh-CN',
  loading: 'lazy' as const,
};
```

### 4. 主题适配

Giscus 会自动根据网站的主题（明暗模式）调整评论区的主题。如果你需要自定义主题，可以在配置中修改 `theme` 选项：

- `'light'` - 浅色主题
- `'dark'` - 深色主题  
- `'preferred_color_scheme'` - 跟随系统主题（推荐）
- `'transparent_dark'` - 透明深色主题
- `'dark_dimmed'` - 暗淡深色主题

### 5. 语言设置

默认语言设置为中文（`zh-CN`），你可以根据需要修改为其他语言：

- `'en'` - 英文
- `'zh-CN'` - 简体中文
- `'zh-TW'` - 繁体中文
- `'ja'` - 日文
- 等等...

### 6. 验证配置

配置完成后，访问任何文章详情页，你应该能在文章底部看到评论区域。

## 故障排除

### 评论区不显示

1. 检查仓库是否已启用 Discussions
2. 确认 giscus GitHub App 已安装到对应仓库
3. 检查配置信息是否正确
4. 查看浏览器控制台是否有错误信息

### 主题不匹配

如果评论区主题与网站主题不匹配，可以尝试：
1. 修改 `theme` 配置为 `'preferred_color_scheme'`
2. 检查网站的主题切换是否正常工作

### 评论加载缓慢

1. 将 `loading` 设置为 `'eager'` 以提前加载
2. 检查网络连接到 GitHub 的速度

## 更多信息

- [Giscus 官方文档](https://github.com/giscus/giscus)
- [GitHub Discussions 文档](https://docs.github.com/en/discussions)