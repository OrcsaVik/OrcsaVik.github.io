/* assets/js/theme.js
   简单主题切换：在 <html> 上设置 data-theme="light" 或 "dark"
   默认：优先 localStorage -> 系统偏好 -> dark
*/

(function(){
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  function getSaved(){
    try{
      return localStorage.getItem('theme');
    }catch(e){ return null; }
  }

  function save(theme){
    try{ localStorage.setItem('theme', theme); }catch(e){}
  }

  function systemPrefersLight(){
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  function current(){
    const s = getSaved();
    if (s) return s;
    return systemPrefersLight() ? 'light' : 'dark';
  }

  function apply(theme){
    if (theme === 'light'){
      root.setAttribute('data-theme', 'light');
      if (btn) btn.textContent = '☀️';
    } else {
      root.setAttribute('data-theme', 'dark');
      if (btn) btn.textContent = '🌙';
    }
  }

  if (btn){
    btn.addEventListener('click', () => {
      const now = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      save(now);
      apply(now);
    });
  }

  apply(current());
})();
