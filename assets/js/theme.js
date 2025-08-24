/* assets/js/theme.js
   深色主题增强模式：提供动态视觉效果切换
   功能：背景动画开关、卡片效果增强、性能模式切换
*/

(function(){
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  
  // 当前模式状态
  let currentMode = 'enhanced'; // enhanced, performance, minimal
  
  function getSaved(){
    try{
      return localStorage.getItem('theme-mode') || 'enhanced';
    }catch(e){ return 'enhanced'; }
  }

  function save(mode){
    try{ localStorage.setItem('theme-mode', mode); }catch(e){}
  }

  function applyMode(mode){
    currentMode = mode;
    
    // 移除所有模式类
    root.classList.remove('mode-enhanced', 'mode-performance', 'mode-minimal');
    
    // 应用新模式
    root.classList.add(`mode-${mode}`);
    
    // 更新按钮显示
    if (btn) {
      const icons = {
        'enhanced': '✨',
        'performance': '⚡',
        'minimal': '🎯'
      };
      btn.textContent = icons[mode] || '✨';
      btn.title = `当前模式: ${getModeName(mode)}`;
    }
    
    // 保存设置
    save(mode);
  }
  
  function getModeName(mode) {
    const names = {
      'enhanced': '增强模式',
      'performance': '性能模式', 
      'minimal': '极简模式'
    };
    return names[mode] || '增强模式';
  }
  
  function cycleMode() {
    const modes = ['enhanced', 'performance', 'minimal'];
    const currentIndex = modes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    applyMode(modes[nextIndex]);
  }

  // 初始化
  if (btn){
    btn.addEventListener('click', cycleMode);
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.1) rotate(5deg)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1) rotate(0deg)';
    });
  }

  // 应用保存的模式
  applyMode(getSaved());
  
  // 添加键盘快捷键支持
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 't') {
      e.preventDefault();
      cycleMode();
    }
  });
})();
