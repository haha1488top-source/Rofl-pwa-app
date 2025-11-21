const CACHE_NAME = 'rico-pwa-v2';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './img/rico_egg_rico_pin.png',
    './img/icon.png'
];

self.addEventListener('install', (event) => {
    console.log('Service Worker встановлюється');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Кеш відкрито');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
