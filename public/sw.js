// Fuji Fenix Elevator — Service Worker (PWA)
// Install: navigator.serviceWorker.register('/sw.js')
// Strategy: Cache-first for static, Network-first for API

const CACHE_NAME = 'fujifenix-v1';
const STATIC_ASSETS = [
  '/',
  '/products',
  '/about',
  '/services',
  '/contact',
  '/sitemap.xml',
  '/manifest.json',
];

// Install — cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — Cache-first for static, Network-first for API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API requests — Network first, fallback to cache
  if (url.pathname.startsWith('/api/') || url.hostname === 'cdn.sanity.io') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Static assets — Cache first, fallback to network
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
});

// Push notification handler
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? { title: 'Fuji Fenix', body: 'New update!' };
  event.waitUntil(
    self.registration.showNotification(data.title ?? 'Fuji Fenix Elevator', {
      body: data.body ?? '',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-96x96.png',
      vibrate: [200, 100, 200],
      data: { url: data.url ?? '/' },
      actions: [
        { action: 'view', title: 'View' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  event.waitUntil(
    clients.openWindow(event.notification.data?.url ?? '/')
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Retry contact form submission
      clients.matchAll().then((clients) => {
        clients.forEach((client) => client.postMessage({ type: 'retry-contact' }));
      })
    );
  }
});
