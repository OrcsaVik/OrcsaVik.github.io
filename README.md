# OrcsaVik.github.io

> 🌐 个人技术博客与作品集网站 | 基于 VuePress + GitHub Actions 自动化部署

![VuePress](https://img.shields.io/badge/Built_with-VuePress-42b883?logo=vue.js)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?logo=github)
![License](https://img.shields.io/badge/License-MIT-green)

## 📁 项目结构说明

| 路径 | 用途 |
|------|------|
| `docs/` | VuePress 内容主目录 |
| `docs/.vuepress/config.js` | 网站配置（标题、导航、主题等） |
| `docs/index.md` | 首页内容 |
| `docs/about.md` | 关于页面 |
| `docs/.vuepress/public/` | 静态资源（如 logo.svg, hero.png, favicon.ico） |
| `.github/workflows/deploy.yml` | GitHub Actions 自动部署脚本 |
| `package.json` | 项目依赖 |

> 📌 **后续添加新功能或文件夹时，请在此处更新说明！**

## 🎨 主题特性

- ✅ 暗色模式（Dark Mode）支持（右上角可切换）
- ✅ 响应式设计（手机/桌面兼容）
- ✅ 简洁现代 UI
- ✅ SEO 友好

## 🚀 快速启动

```bash
npm install
npm run dev