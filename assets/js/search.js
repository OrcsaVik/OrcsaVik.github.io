/* assets/js/search.js
   前端搜索与标签过滤（基于构建时生成的 /search.json）
   兼容离线（若 search.json 未能加载，页面早已渲染静态卡片作为降级）
*/

(function(){
  const searchInput = document.getElementById('search-input');
  const tagSelect = document.getElementById('tag-select');
  const postsGrid = document.getElementById('posts-grid');

  let index = [];

  // 安全 fetch，路径使用根相对 /search.json
  async function loadIndex(){
    try{
      const res = await fetch('/search.json', {cache: 'no-store'});
      if (!res.ok) throw new Error('search.json not found');
      index = await res.json();
    }catch(e){
      console.warn('加载搜索索引失败，启用降级渲染：', e);
      index = [];
    }
  }

  // HTML escape
  function escapeHtml(str){
    if (!str) return '';
    return str.replace(/[&<>"'\/]/g, s => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;'
    })[s]);
  }

  // 渲染结果列表（覆盖 postsGrid）
  function renderPosts(items){
    if (!postsGrid) return;
    postsGrid.innerHTML = '';
    if (!items || items.length === 0){
      postsGrid.innerHTML = '<p style="grid-column:1/-1;color:var(--muted)">未找到匹配的文章。</p>';
      return;
    }
    const frag = document.createDocumentFragment();
    items.forEach(it => {
      const art = document.createElement('article');
      art.className = 'post-card';
      art.setAttribute('data-tags', (it.tags || []).join(','));
      art.innerHTML = `
        <a class="post-link" href="${it.url}">
          <h3 class="post-title">${escapeHtml(it.title)}</h3>
        </a>
        <div class="post-meta"><span class="post-date">${escapeHtml(it.date)}</span>${it.tags && it.tags.length ? '<span class="post-tags"> · ' + escapeHtml(it.tags.join(', ')) + '</span>' : ''}</div>
        <p class="post-excerpt">${escapeHtml(it.excerpt || '')}</p>
      `;
      frag.appendChild(art);
    });
    postsGrid.appendChild(frag);
  }

  // 执行搜索与标签过滤
  function performSearch(){
    if (!index.length) return; // 若没有索引，则不替换页面（保留 Jekyll 渲染的内容）
    const q = (searchInput && searchInput.value || '').trim().toLowerCase();
    const tag = (tagSelect && tagSelect.value || '').trim().toLowerCase();

    const results = index.filter(item => {
      // 标签过滤
      if (tag){
        const tagsLower = (item.tags || []).map(t => (t||'').toLowerCase());
        if (!tagsLower.includes(tag)) return false;
      }
      if (!q) return true;
      // 标题/摘要/内容/标签包含匹配
      const inTitle = (item.title || '').toLowerCase().includes(q);
      const inExcerpt = (item.excerpt || '').toLowerCase().includes(q);
      const inContent = (item.content || '').toLowerCase().includes(q);
      const inTags = (item.tags || []).join(',').toLowerCase().includes(q);
      return inTitle || inExcerpt || inContent || inTags;
    });

    renderPosts(results);
  }

  // debounce
  function debounce(fn, wait){
    let t;
    return function(...args){
      clearTimeout(t);
      t = setTimeout(()=>fn.apply(this,args), wait);
    };
  }

  // 初始化
  async function init(){
    await loadIndex();
    if (index.length && postsGrid){
      // 使用索引完全渲染（统一样式），否则保留 Jekyll 已渲染的卡片
      renderPosts(index);
    }

    if (searchInput){
      searchInput.addEventListener('input', debounce(performSearch, 160));
    }
    if (tagSelect){
      tagSelect.addEventListener('change', performSearch);
    }
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
