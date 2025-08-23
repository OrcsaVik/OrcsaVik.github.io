(() => {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  function currentTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    // 如果用户偏好系统主题则默认使用
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      btn.textContent = '☀️';
    } else {
      root.setAttribute('data-theme', 'dark');
      btn.textContent = '🌙';
    }
  }

  // toggle
  btn && btn.addEventListener('click', () => {
    const t = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', t);
    applyTheme(t);
  });

  // init
  applyTheme(currentTheme());
})();
