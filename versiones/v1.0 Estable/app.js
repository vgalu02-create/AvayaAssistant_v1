// ======================================
// AVAYA ASSISTANT v1.0
// app.js
// ======================================

window.addEventListener("load", () => {

    // Recuperar datos guardados
    cargarDatos();

    console.log("🎧 Avaya Assistant iniciado");

});

// Guardar automáticamente cada segundo
setInterval(() => {

    guardarDatos();

},1000);
// ======================================
// REGISTRAR SERVICE WORKER
// ======================================

if("serviceWorker" in navigator){

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./service-worker.js")

        .then(() => {

            console.log("✅ Service Worker registrado");

        })

        .catch(error => {

            console.error(error);

        });

    });

}
// ======================================
// REGISTRAR SERVICE WORKER
// ======================================

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("./service-worker.js")
        .then(() => {

            console.log("✅ Service Worker registrado");

        })
        .catch(error => {

            console.error("❌ Error al registrar Service Worker:", error);

        });

}