const CACHE_NAME: string = "hc-dnd-cache-v1";
const urlsToCache: string[] = [
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/5705.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/1633.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/248.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/man-sprite-atlas.png",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/247.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/5413.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/7793.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/9801.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/1893.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/9893.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/7879.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/7794.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/11142.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/6000.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/1576.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/5611.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/4783.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/670.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/9791.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/10124.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/man.png",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/1920.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/3972.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/1665.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/10514.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/45.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/3178.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/6479.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/1771.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/9787.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/6406.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/woman.png",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/793.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/house.png",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/10047.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/3668.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/303.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/9591.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/11157.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/6475.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/10191.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/1664.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/1912.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/16.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/3201.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/5677.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/6005.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/6258.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/302.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/9789.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/10826.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/6480.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/6423.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/5986.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/10354.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/10196.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/9895.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/10194.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/6124.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/7795.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/10066.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/10190.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/7792.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/9795.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/10193.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/4739.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/9894.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/agents/11019.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/1.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/2.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/11.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/7.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/14.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/13.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/4.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/5.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/15.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/9.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/3.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/6.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/16.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/8.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/10.gif",
  "https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/12.gif",
];

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache: Cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Erro ao adicionar ao cache:", error);
        throw error;
      });
    })
  );
});

self.addEventListener("fetch", (event: FetchEvent) => {
  if (
    event.request.url.includes("hookcaptain.s3.sa-east-1.amazonaws.com/images/")
  ) {
    event.respondWith(
      caches.match(event.request).then((response: Response | undefined) => {
        if (response) {
          return response;
        }
        return fetch(event.request); //, { mode: "no-cors" });
      })
    );
  } else if (
    event.request.method === "GET" &&
    event.request.url.includes("/map-asset-sprite") ||
    event.request.url.includes("/agent-sprite")
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            const responseClone = networkResponse.clone();

            // Cheque se a resposta é válida antes de armazenar no cache
            if (networkResponse.ok) {
              cache.put(event.request, responseClone);
            }
            return networkResponse;
          });

          return response || fetchPromise;
        });
      })
    );
  } else {
    // Para todas as outras requisições, apenas passa a requisição e não altera o modo
    event.respondWith(fetch(event.request));
  }
});
