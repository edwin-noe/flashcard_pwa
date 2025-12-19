const CACHE = "flashcards-v1";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        "/",
        "/vocab",
        "/static/style.css",
        "/static/script.js"
      ])
    )
  );
});
