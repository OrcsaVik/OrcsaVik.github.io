/* sw.js — service worker for offline support */
const CACHE_NAME = 'orcsavik-cache-v1';
const CORE_ASSETS = [
  '/',                // root (index)
  '/index.html',
  '/search.json',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/js/search.js',
  '/assets/js/theme.js',
  '/assets/js/sw-register.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // network-first for search.json
  if (url.pathname === '/search.json') {
    event.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return resp;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // navigation -> network-first then fallback to cache
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return resp;
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // other assets: cache-first
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      caches.open(CACHE_NAME).then(cache => cache.put(req, resp.clone()));
      return resp;
    })).catch(() => caches.match('/index.html'))
  );
});
