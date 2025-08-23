const CACHE_NAME = 'orcsavik-cache-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/search.json',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/js/search.js',
  '/assets/js/theme.js'
];

// install: pre-cache core assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
});

// activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => {
        if (k !== CACHE_NAME) return caches.delete(k);
      })
    ))
  );
  self.clients.claim();
});

// fetch: cache-first for static assets, network-first for HTML/JSON
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Network-first for search.json (try network then fallback to cache)
  if (url.pathname === '/search.json') {
    event.respondWith(
      fetch(req).then(resp => {
        // update cache
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return resp;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // For navigation (HTML), try network then cache
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(resp => {
        // update cache and return
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return resp;
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // For other assets, use cache-first
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      // put in cache
      caches.open(CACHE_NAME).then(cache => cache.put(req, resp.clone()));
      return resp;
    })).catch(() => caches.match('/index.html'))
  );
});
