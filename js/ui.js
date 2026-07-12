// ======================================
// AVAYA ASSISTANT V3
// ui.js
// ======================================

// ---------- ELEMENTOS ----------

const reloj = document.querySelector(".reloj");
const estado = document.getElementById("estado");

const btnIniciar = document.getElementById("btnIniciar");
const btnFinalizar = document.getElementById("btnFinalizar");

const btnDisponible = document.getElementById("btnDisponible");
const btnOcupado = document.getElementById("btnOcupado");
const btnDescanso = document.getElementById("btnDescanso");
const btnComida = document.getElementById("btnComida");

const txtDisponible = document.getElementById("tiempoDisponible");
const txtOcupado = document.getElementById("tiempoOcupado");
const txtDescanso = document.getElementById("tiempoDescanso");
const txtComida = document.getElementById("tiempoComida");

// ======================================
// ACTUALIZAR RELOJ
// ======================================

function actualizarReloj(){

    reloj.textContent =
        motorTiempo.formato(
            motorTiempo.tiempoTurno()
        );

}

// ======================================
// ACTUALIZAR TARJETAS
// ======================================

function actualizarTarjetas(){

    txtDisponible.textContent =
        motorTiempo.formato(
            motorTiempo.tiempoEstado("disponible")
        );

    txtOcupado.textContent =
        motorTiempo.formato(
            motorTiempo.tiempoEstado("ocupado")
        );

    txtDescanso.textContent =
        motorTiempo.formato(
            motorTiempo.tiempoEstado("descanso")
        );

    txtComida.textContent =
        motorTiempo.formato(
            motorTiempo.tiempoEstado("comida")
        );

}

// ======================================
// ACTUALIZAR ESTADO
// ======================================

function mostrarEstado(nombre){

    switch(nombre){

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

}
// ======================================
// BOTÓN INICIAR
// ======================================

btnIniciar.addEventListener("click",()=>{

    if(!confirm("¿Iniciar turno?")){
        return;
    }

    motorTiempo.iniciarTurno();

    mostrarEstado("conectado");

    actualizarReloj();

    actualizarTarjetas();

    guardarDatos();

});

// ======================================
// BOTÓN FINALIZAR
// ======================================

btnFinalizar.addEventListener("click",()=>{

    if(!motorTiempo.turno.iniciado){

        alert("No hay un turno iniciado.");

        return;

    }

    motorTiempo.finalizarTurno();

    guardarDatos();

    alert(

`🏁 RESUMEN DEL TURNO

🟢 Disponible
${motorTiempo.formato(motorTiempo.tiempoEstado("disponible"))}

🟡 Ocupado
${motorTiempo.formato(motorTiempo.tiempoEstado("ocupado"))}

🔵 Descanso
${motorTiempo.formato(motorTiempo.tiempoEstado("descanso"))}

🍔 Comida
${motorTiempo.formato(motorTiempo.tiempoEstado("comida"))}`

    );

});

// ======================================
// BOTONES DE ESTADO
// ======================================

btnDisponible.addEventListener("click",()=>{

    motorTiempo.cambiarEstado("disponible");

    mostrarEstado("disponible");

});

btnOcupado.addEventListener("click",()=>{

    motorTiempo.cambiarEstado("ocupado");

    mostrarEstado("ocupado");

});

btnDescanso.addEventListener("click",()=>{

    motorTiempo.cambiarEstado("descanso");

    mostrarEstado("descanso");

});

btnComida.addEventListener("click",()=>{

    motorTiempo.cambiarEstado("comida");

    mostrarEstado("comida");

});
// ======================================
// ACTUALIZAR PANTALLA
// ======================================

function actualizarPantalla(){

    actualizarReloj();

    actualizarTarjetas();

}

// Refrescar la pantalla 4 veces por segundo
setInterval(actualizarPantalla,250);

// ======================================
// INICIALIZAR
// ======================================

mostrarEstado("conectado");

actualizarPantalla();
