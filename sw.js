const CACHE_NAME = 'rico-pwa-v5';
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
                console.log('Кешуються файли');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Повертаємо кешовану версію або робимо запит
                return response || fetch(event.request);
            })
            .catch(() => {
                // Fallback для головної сторінки
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            })
    );
});
