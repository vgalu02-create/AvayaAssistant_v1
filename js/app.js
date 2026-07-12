// ======================================
// AVAYA ASSISTANT V3
// app.js
// ======================================

window.addEventListener("load", () => {

    console.log("🎧 Avaya Assistant V3 iniciado");

    // Recuperar datos guardados
    cargarDatos();

    // Registrar Service Worker
    registrarServiceWorker();

});

// ======================================
// GUARDADO AUTOMÁTICO
// ======================================

setInterval(() => {

    guardarDatos();

}, 1000);

// ======================================
// SERVICE WORKER
// ======================================

function registrarServiceWorker(){

    if(!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
        .register("./service-worker.js")

        .then(()=>{

            console.log("✅ Service Worker registrado");

        })

        .catch(error=>{

            console.error(error);

        });

}