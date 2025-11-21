const CACHE_NAME = 'rico-pwa-v6';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './img/rico_egg_rico_pin.png',
  './img/icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
