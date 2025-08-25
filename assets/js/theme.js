/* assets/js/theme.js
   Enhanced Theme Mode Switcher with SVG Icons
   Features: Dynamic visual effects, performance modes, minimal mode
*/

(function(){
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  
  // Current mode state
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
    
    // Remove all mode classes
    root.classList.remove('mode-enhanced', 'mode-performance', 'mode-minimal');
    
    // Apply new mode
    root.classList.add(`mode-${mode}`);
    
    // Update button display and SVG icons
    if (btn) {
      const icons = btn.querySelectorAll('.theme-icon');
      icons.forEach(icon => icon.style.display = 'none');
      
      const activeIcon = btn.querySelector(`.${mode}-icon`);
      if (activeIcon) {
        activeIcon.style.display = 'block';
      }
      
      // Update tooltip
      btn.title = `Current mode: ${getModeName(mode)}`;
      
      // Add visual feedback
      btn.classList.add('mode-changed');
      setTimeout(() => btn.classList.remove('mode-changed'), 300);
    }
    
    // Save settings
    save(mode);
    
    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('themeModeChanged', { detail: { mode } }));
  }
  
  function getModeName(mode) {
    const names = {
      'enhanced': 'Enhanced Mode',
      'performance': 'Performance Mode', 
      'minimal': 'Minimal Mode'
    };
    return names[mode] || 'Enhanced Mode';
  }
  
  function cycleMode() {
    const modes = ['enhanced', 'performance', 'minimal'];
    const currentIndex = modes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    applyMode(modes[nextIndex]);
  }

  // Initialize
  if (btn){
    btn.addEventListener('click', cycleMode);
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.1) rotate(5deg)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Add keyboard navigation
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cycleMode();
      }
    });
  }

  // Apply saved mode
  applyMode(getSaved());
  
  // Add keyboard shortcuts
  document.addEventListener('themeModeChanged', (e) => {
    if (e.ctrlKey && e.key === 't') {
      e.preventDefault();
      cycleMode();
    }
  });
  
  // Auto-detect system preference for initial load
  function detectSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'minimal';
    }
    return 'enhanced';
  }
  
  // Listen for system preference changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      if (e.matches && currentMode === 'enhanced') {
        applyMode('minimal');
      }
    });
  }
})();
