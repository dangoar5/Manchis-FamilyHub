const CACHE_NAME = "familyhub-v1";

const ARCHIVOS = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/style.css",

    "./js/config.js",
    "./js/data.js",
    "./js/components.js",
    "./js/services.js",
    "./js/ui.js",
    "./js/modal.js",
    "./js/alertas.js",
    "./js/mercado.js",
    "./js/agenda.js",
    "./js/tareas.js",
    "./js/sync.js",
    "./js/script.js",

    "./icons/icon-192.png",
    "./icons/icon-512.png",

    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",

    "https://cdn.jsdelivr.net/npm/@azure/msal-browser@2.38.2/lib/msal-browser.min.js"

];

self.addEventListener("install", function (event) {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => cache.addAll(ARCHIVOS))

    );

});

self.addEventListener("activate", function (event) {

    event.waitUntil(

        caches.keys().then(function (keys) {

            return Promise.all(

                keys.map(function (key) {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            );

        })

    );

});

self.addEventListener("fetch", function (event) {

    event.respondWith(

        caches.match(event.request)

            .then(function (response) {

                return response || fetch(event.request);

            })

    );

});