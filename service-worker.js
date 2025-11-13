const CACHE_NAME = "sate-pwa-v1";
const FILES = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp =>
      resp || fetch(evt.request).catch(() => caches.match("./index.html"))
    )
  );
});
