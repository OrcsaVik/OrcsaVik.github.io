/* assets/js/sw-register.js */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function(){
    // 使用根相对路径注册 service worker
    navigator.serviceWorker.register('/sw.js').then(function(reg){
      // 注册成功 — 可选日志
      // console.log('SW registered', reg);
    }).catch(function(err){
      console.warn('Service Worker 注册失败:', err);
    });
  });
}
