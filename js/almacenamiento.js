// ======================================
// AVAYA ASSISTANT v1.0
// almacenamiento.js
// ======================================

const CLAVE_GUARDADO = "avayaAssistant";

// ======================================
// GUARDAR DATOS
// ======================================

function guardarDatos(){

    const datos = {

        turnoIniciado,
        estadoActual,

        tiempoDisponible,
        tiempoOcupado,
        tiempoDescanso,
        tiempoComida

    };

    localStorage.setItem(
        CLAVE_GUARDADO,
        JSON.stringify(datos)
    );

}

// ======================================
// CARGAR DATOS
// ======================================

function cargarDatos(){

    const texto = localStorage.getItem(CLAVE_GUARDADO);

    if(texto == null){

        return;

    }

    const datos = JSON.parse(texto);

    turnoIniciado = datos.turnoIniciado ?? false;
    estadoActual = datos.estadoActual ?? "conectado";

    tiempoDisponible = datos.tiempoDisponible ?? 0;
    tiempoOcupado = datos.tiempoOcupado ?? 0;
    tiempoDescanso = datos.tiempoDescanso ?? 0;
    tiempoComida = datos.tiempoComida ?? 0;

    actualizarTarjetas();

    switch(estadoActual){

        case "conectado":

            estado.textContent="🟣 Conectado";
            estado.style.color="#7c3aed";

        break;

        case "disponible":

            estado.textContent="🟢 Disponible";
            estado.style.color="#22c55e";

        break;

        case "ocupado":

            estado.textContent="🟡 Ocupado";
            estado.style.color="#eab308";

        break;

        case "descanso":

            estado.textContent="🔵 Descanso";
            estado.style.color="#2563eb";

        break;

        case "comida":

            estado.textContent="🍔 Comida";
            estado.style.color="#ea580c";

        break;

    }

    console.log("✅ Datos recuperados");

}

// ======================================
// BORRAR DATOS
// ======================================

function borrarDatos(){

    localStorage.removeItem(CLAVE_GUARDADO);

    console.log("🗑 Datos eliminados");

}