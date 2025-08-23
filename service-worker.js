const CACHE_NAME = "orcsa-cache-v1";
const urlsToCache = [
  "/",
  "/assets/css/style.css",
  "/assets/css/dark.css",
  "/assets/js/search.js",
  "/assets/js/pwa.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(resp => resp || fetch(e.request)));
});
