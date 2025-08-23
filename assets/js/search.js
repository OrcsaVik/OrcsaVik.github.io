// search.js
// 说明：简单、稳定的前端搜索（无需第三方库）。
// 实现：在页面加载时 fetch('/search.json') 获取索引数组，
// 然后在输入框中进行小写包含匹配（标题/摘要/正文/标签），并渲染 posts-grid。

(() => {
  const searchInput = document.getElementById('search-input');
  const tagSelect = document.getElementById('tag-select');
  const postsGrid = document.getElementById('posts-grid');

  let index = []; // 将保存 search.json 内容

  // fetch search index
  async function loadIndex() {
    try {
      const res = await fetch("{{ '/' | relative_url }}search.json".replace(/^\/\//,'/'));
      if (!res.ok) throw new Error('index fetch failed');
      index = await res.json();
    } catch (err) {
      // 如果 fetch 失败，index 保持空，页面上已有卡片（降级）
      console.warn('搜索索引加载失败：', err);
      index = [];
    }
  }

  // render posts from an array of items (each item corresponds to search.json entry)
  function renderPosts(items) {
    if (!postsGrid) return;
    postsGrid.innerHTML = '';
    if (!items || items.length === 0) {
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
        <div class="post-meta"><span class="post-date">${it.date}</span>${it.tags && it.tags.length ? '<span class="post-tags"> · ' + escapeHtml(it.tags.join(', ')) + '</span>' : ''}</div>
        <p class="post-excerpt">${escapeHtml(it.excerpt || '')}</p>
      `;
      frag.appendChild(art);
    });
    postsGrid.appendChild(frag);
  }

  // simple HTML escape to avoid injection
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"'\/]/g, s => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;'
    })[s]);
  }

  // search logic: filter index by query and tag; substring match on title/excerpt/content/tags
  function performSearch() {
    if (!index.length) return; // index empty -> do nothing (fallback to built-in cards)
    const q = (searchInput.value || '').trim().toLowerCase();
    const tag = (tagSelect.value || '').trim().toLowerCase();

    const results = index.filter(item => {
      // tag filter
      if (tag && item.tags && item.tags.length) {
        const tagsLower = item.tags.map(t => t.toLowerCase());
        if (!tagsLower.includes(tag)) return false;
      }
      if (!q) return true;
      // search in title/excerpt/content/tags
      const inTitle = (item.title || '').toLowerCase().includes(q);
      const inExcerpt = (item.excerpt || '').toLowerCase().includes(q);
      const inContent = (item.content || '').toLowerCase().includes(q);
      const inTags = (item.tags || []).join(',').toLowerCase().includes(q);
      return inTitle || inExcerpt || inContent || inTags;
    });

    renderPosts(results);
  }

  // events
  async function init() {
    await loadIndex();

    // if index loaded, render all posts from index (ensures consistent card layout)
    if (index.length && postsGrid) {
      renderPosts(index);
    }

    if (searchInput) {
      searchInput.addEventListener('input', debounce(performSearch, 160));
    }
    if (tagSelect) {
      tagSelect.addEventListener('change', performSearch);
    }
  }

  // debounce helper
  function debounce(fn, wait) {
    let t;
    return function(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // initialize after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
