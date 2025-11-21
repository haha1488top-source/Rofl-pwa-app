const CACHE_NAME = 'rico-pwa-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    'img/rico_egg_rico_pin.png',
    'img/icon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
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
