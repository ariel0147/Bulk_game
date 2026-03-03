const CACHE_NAME = 'bulk-game-v4'; // העלינו לגרסה 4 כדי לרענן את הזיכרון למשתמשים // העלינו לגרסה 3 כדי לרענן את הזיכרון
const urlsToCache = [
    './',
    './Bulk_game.html',
    './Bulk_game.css',
    './Bulk_game.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './sounds/tick.mp3',
    './sounds/found.mp3',
    './sounds/error.mp3',
    './sounds/win.mp3'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});