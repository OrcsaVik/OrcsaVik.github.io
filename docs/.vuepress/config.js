module.exports = {
  title: 'Orcsa Vik',
  description: 'A passionate web developer',

  // 基础路径（GitHub Pages 使用）
  base: '/',

  // 主题配置
  theme: '@vuepress/theme-default',

  themeConfig: {
    logo: '/logo.svg', // 可选：添加个人 logo
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
    ],

    // 启用深色模式切换按钮
    darkMode: true,

    // 社交链接（示例）
    socialLinks: [
      { icon: 'github', link: 'https://github.com/OrcsaVik' }
    ],

    // 页脚内容
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Orcsa Vik'
    }
  },

  // 构建输出目录
  dest: 'dist',

  // 页面标题模板
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c87c4' }]
  ]
}