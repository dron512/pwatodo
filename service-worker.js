const CACHE_NAME = "pwa-todo-cache-v1";
const urlsToCache = [
    "/pwatodo/", // 루트 경로
    "/pwatodo/index.html",
    "/pwatodo/style.css",
    "/pwatodo/app.js",
    "/pwatodo/manifest.json",
    "/pwatodo/assets/icon-192.png",  // 아이콘 경로 확인
    "/pwatodo/assets/icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .catch(error => console.error("캐싱 오류 발생:", error)) // 오류 로그 출력
    );
});


self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
