const CACHE_NAME = 'bulk-game-v1';
const urlsToCache = [
    './',
    './Bulk_game.html',
    './Bulk_game.css',
    './Bulk_game.js',
    './manifest.json',
    './anime.jpg',
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
                // מחזיר את הקובץ מהזיכרון במידה וקיים, אחרת מוריד מהרשת
                return response || fetch(event.request);
            })
    );
});