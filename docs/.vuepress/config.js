const { webpackBundler } = require('@vuepress/bundler-webpack')

module.exports = {
  // 站点配置
  title: 'Orcsa Vik',
  description: 'Personal Portfolio & Blog',

  // 主题配置（使用默认主题）
  theme: '@vuepress/theme-default',

  // 打包工具配置
  bundler: webpackBundler({
    // 可选：自定义 Webpack 配置
    configureWebpack: {
      optimization: {
        minimize: true,
      },
    },
  }),

  // 可选：基础路径（如果是仓库名.orc.github.io，用 '/'）
  base: '/',

  // 导航栏配置（示例）
  themeConfig: {
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about.md' },
    ],
  },
}