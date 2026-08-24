const CACHE_NAME = "meu-financeiro-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./manifest.json"
];


// Instalação
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(ARQUIVOS);

            })

    );

    self.skipWaiting();

});


// Ativação
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(chaves => {

                return Promise.all(

                    chaves
                        .filter(
                            chave =>
                                chave !== CACHE_NAME
                        )
                        .map(
                            chave =>
                                caches.delete(chave)
                        )

                );

            })

    );

    self.clients.claim();

});


// Funcionamento offline
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(resposta => {

                if (resposta) {

                    return resposta;

                }

                return fetch(event.request);

            })

    );

});
