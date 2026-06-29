// ======================================
// AVAYA ASSISTANT v2.0
// avaya.js
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
// RELOJ
// ======================================

function actualizarReloj(){

    const ahora = new Date();

    reloj.textContent = ahora.toLocaleTimeString(
        "es-MX",
        {
            hour12:false
        }
    );

}

actualizarReloj();

setInterval(actualizarReloj,1000);

// ======================================
// FORMATO
// ======================================

function formato(segundos){

    const h = String(
        Math.floor(segundos/3600)
    ).padStart(2,"0");

    const m = String(
        Math.floor((segundos%3600)/60)
    ).padStart(2,"0");

    const s = String(
        segundos%60
    ).padStart(2,"0");

    return `${h}:${m}:${s}`;

}

// ======================================
// ACTUALIZAR TARJETAS
// ======================================

function actualizarTarjetas(){

    txtDisponible.textContent = formato(tiempoDisponible);

    txtOcupado.textContent = formato(tiempoOcupado);

    txtDescanso.textContent = formato(tiempoDescanso);

    txtComida.textContent = formato(tiempoComida);

}

// ======================================
// CAMBIAR ESTADO
// ======================================

function cambiarEstado(nuevoEstado){

    if(!turnoIniciado){
        return;
    }

    estadoActual = nuevoEstado;

    switch(nuevoEstado){        case "conectado":

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

    actualizarTarjetas();

}

// ======================================
// CONTADOR GENERAL
// ======================================

setInterval(function(){

    if(!turnoIniciado){
        return;
    }

    switch(estadoActual){

        case "disponible":

            tiempoDisponible++;

        break;

        case "ocupado":

            tiempoOcupado++;

        break;

        case "descanso":

            tiempoDescanso++;

        break;

        case "comida":

            tiempoComida++;

        break;

    }

 actualizarTarjetas();

guardarDatos();

},1000);
// ======================================
// BOTÓN INICIAR
// ======================================

btnIniciar.onclick=function(){

    if(!confirm("¿Iniciar turno?")){
        return;
    }

    turnoIniciado=true;

    tiempoDisponible=0;
    tiempoOcupado=0;
    tiempoDescanso=0;
    tiempoComida=0;

 cambiarEstado("conectado");

guardarDatos();

};
// ======================================
// BOTÓN FINALIZAR
// ======================================

btnFinalizar.onclick=function(){

    if(!turnoIniciado){
        alert("No hay un turno iniciado.");
        return;
    }

  turnoIniciado=false;

borrarDatos();
  alert(
`🏁 RESUMEN DEL TURNO

🟢 Disponible
${formato(tiempoDisponible)}

🟡 Ocupado
${formato(tiempoOcupado)}

🔵 Descanso
${formato(tiempoDescanso)}

🍔 Comida
${formato(tiempoComida)}`
    );

};

// ======================================
// BOTONES DE ESTADO
// ======================================

btnDisponible.onclick=function(){

    cambiarEstado("disponible");

};

btnOcupado.onclick=function(){

    cambiarEstado("ocupado");

};

btnDescanso.onclick=function(){

    cambiarEstado("descanso");

};

btnComida.onclick=function(){

    cambiarEstado("comida");

};

// ======================================
// INICIALIZAR
// ======================================
actualizarTarjetas();

guardarDatos();

