// Service Worker for 山海经数字化展示 — PWA Offline Support
// 缓存策略：静态资源 Cache First，导航请求 Network First with offline fallback

const CACHE_NAME = 'shanhaijing-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
];

// Install: 预缓存核心静态资源
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  (self as any).skipWaiting();
});

// Activate: 清理旧缓存
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  (self as any).clients.claim();
});

// Fetch: Cache-first for JS/CSS/Images, Network-first for HTML
self.addEventListener('fetch', (event: FetchEvent) => {
  const url = new URL(event.request.url);

  // 只处理同源请求
  if (url.origin !== self.location.origin) return;

  // 静态资源 — Cache First
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|webp|svg|woff2?|mp4|json)$/)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
        return cached || fetchPromise;
      })
    );
    return;
  }

  // HTML/导航请求 — Network First, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          return cached || caches.match('/index.html');
        });
      })
  );
});
