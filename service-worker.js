// ======================================
// AVAYA ASSISTANT v1.0
// service-worker.js
// ======================================

const CACHE_NAME = "avaya-assistant-v1";

const ARCHIVOS = [

    "./",
    "./index.html",
    "./estilos.css",
    "./estado.js",
    "./avaya.js",
    "./temporizador.js",
    "./almacenamiento.js",
    "./app.js",
    "./manifest.json",
    "./assets/icono-192.png",
    "./assets/icono-512.png"

];

// ======================================
// INSTALACIÓN
// ======================================

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => cache.addAll(ARCHIVOS))

    );

});

// ======================================
// ACTIVACIÓN
// ======================================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            )

        )

    );

});

// ======================================
// PETICIONES
// ======================================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            return response || fetch(event.request);

        })

    );

});