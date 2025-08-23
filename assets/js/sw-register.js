// register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('{{ "/sw.js" | relative_url }}').then(reg => {
      // console.log('SW registered', reg);
    }).catch(err => {
      console.warn('SW 注册失败', err);
    });
  });
}
