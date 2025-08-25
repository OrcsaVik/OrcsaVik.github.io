
# OrcsaVik's Tech Blog

A modern, responsive Jekyll blog with a stunning dark aesthetic and card-based design. Built for GitHub Pages with enhanced visual effects and smooth animations.

## ✨ Features

- **🎨 Enhanced Theme System**: Three theme modes (Enhanced, Performance, Minimal) with smart SVG icons
- **🃏 Card-Based Layout**: Beautiful post cards with hover animations and theme-aware effects
- **📱 Fully Responsive**: Optimized for all device sizes with adaptive theme controls
- **🌈 Dynamic Backgrounds**: Animated gradient backgrounds with theme-specific intensity
- **✨ Enhanced Typography**: Gradient text effects and smooth transitions
- **🚀 Performance Optimized**: Lightweight and fast loading with performance mode options

## 🎯 Design Highlights

### Dynamic Background System
- Multi-layered gradient backgrounds with subtle animations
- Floating geometric patterns for visual depth
- Smooth color transitions and scaling effects

### Enhanced Card Design
- Glassmorphism effects with backdrop blur
- Hover animations with 3D transforms
- Gradient borders and glowing shadows
- Smooth color transitions on hover

### Typography Enhancements
- Gradient text effects for titles and headings
- Animated color shifts on hover
- Improved readability with optimized contrast

## 🛠️ Technical Features

- **Jekyll 4.x** compatible
- **GitHub Pages** ready
- **CSS Grid & Flexbox** for modern layouts
- **CSS Custom Properties** for easy theming
- **Smooth animations** with CSS transitions
- **Backdrop filters** for modern glass effects

## 📁 Project Structure

```
.
├── _config.yml          # Jekyll configuration
├── index.md             # Home page
├── _layouts/            # Page layouts
│   ├── default.html     # Base layout
│   ├── home.html        # Home page layout
│   └── page.html        # Post layout
├── _includes/           # Reusable components
│   ├── head.html        # Head section
│   ├── header.html      # Navigation header
│   └── footer.html      # Site footer
├── assets/              # Static assets
│   ├── css/
│   │   └── style.css    # Main stylesheet
│   └── js/
│       └── theme.js     # Theme toggle
└── _posts/              # Blog posts
    ├── 2025-08-01-first-post.md
    └── 2025-08-01-first-post2.md
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/OrcsaVik/OrcsaVik.github.io.git
   cd OrcsaVik.github.io
   ```

2. **Install Jekyll** (if running locally)
   ```bash
   gem install jekyll bundler
   bundle install
   ```

3. **Run locally**
   ```bash
   bundle exec jekyll serve
   ```

4. **Deploy to GitHub Pages**
   - Push to main branch
   - GitHub Pages will automatically build and deploy

## 🎨 Customization

### Colors
The theme uses CSS custom properties for easy color customization:

```css
:root {
  --bg: #0a0a0f;                    /* Background */
  --panel:rgb(101, 101, 221);                 /* Panel backgrounds */
  --text: #e8e8f0;                  /* Primary text */
  --accent: #64d2ff;                /* Primary accent */
  --accent-secondary: #ff6b9d;      /* Secondary accent */
  --accent-tertiary: #7c3aed;       /* Tertiary accent */
}
```

### Adding Posts
Create new posts in the `_posts/` directory with the format:
```markdown
---
layout: page
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS +0800
tags: ["tag1", "tag2"]
excerpt: "Brief description of your post"
---

Your post content here...
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 820px - 1199px
- **Mobile**: < 820px

## 🔧 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📈 Performance Features

- **Optimized CSS**: Minimal unused styles
- **Efficient animations**: Hardware-accelerated transforms
- **Lazy loading**: Images and heavy content
- **Minimal JavaScript**: Only essential functionality

## 🎭 Animation System

### Background Animations
- `backgroundShift`: Subtle scaling and rotation
- `patternMove`: Floating pattern movement
- `heroGlow`: Hero section glow effect

### Interactive Animations
- Card hover effects with 3D transforms
- Smooth color transitions
- Gradient text animations
- Navigation hover effects

## 🎭 Theme System

### Three Theme Modes
- **✨ Enhanced Mode**: Full dynamic effects with animated backgrounds, glowing cards, and smooth transitions
- **⚡ Performance Mode**: Reduced animations for better performance while maintaining visual appeal  
- **🎯 Minimal Mode**: Clean, distraction-free experience with minimal effects

### Key Features
- **Smart SVG Icons**: Beautiful third-party SVG components for each theme mode
- **Global Synchronization**: All components automatically adapt to theme changes
- **System Preference Detection**: Automatically switches to minimal mode for users with reduced motion preferences
- **Keyboard Shortcuts**: Ctrl+T to cycle through themes
- **Persistent Storage**: Remembers your theme preference across sessions

## 🚫 Removed Features

- **Search functionality**: Simplified for performance
- **PWA/Service Worker**: Focused on core blog experience
- **Light theme**: Dark-only for consistent aesthetic with enhanced theme modes

## 🔮 Future Enhancements

- [ ] Post reading time estimates
- [ ] Social media sharing buttons
- [ ] Related posts suggestions
- [ ] Newsletter subscription
- [ ] Comment system integration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ using Jekyll and modern web technologies**