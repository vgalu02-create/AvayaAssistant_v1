// ======================================
// AVAYA ASSISTANT v1.0
// temporizador.js
// ======================================

// ---------- ELEMENTOS ----------
const contadorCliente = document.getElementById("contadorCliente");
const progreso = document.getElementById("progreso");

const btn2min = document.getElementById("btn2min");
const btn3min = document.getElementById("btn3min");
const btn5min = document.getElementById("btn5min");
const btn7min = document.getElementById("btn7min");
const btnCancelar = document.getElementById("btnCancelar");

// ---------- VARIABLES ----------
let tiempoCliente = 0;
let tiempoInicial = 0;
let intervaloCliente = null;

// ======================================
// ACTUALIZAR PANTALLA
// ======================================

function actualizarTemporizador(){

    const minutos = String(Math.floor(tiempoCliente/60)).padStart(2,"0");
    const segundos = String(tiempoCliente%60).padStart(2,"0");

    contadorCliente.textContent = `${minutos}:${segundos}`;

    // ---------- Barra de progreso ----------
    let porcentaje = 100;

    if(tiempoInicial>0){

        porcentaje = (tiempoCliente/tiempoInicial)*100;

    }

    progreso.style.width = porcentaje+"%";

    // ---------- Colores ----------
    contadorCliente.style.color="#111827";
    progreso.style.background="#22c55e";

    if(tiempoCliente<=30){

        contadorCliente.style.color="#f59e0b";
        progreso.style.background="#f59e0b";

    }

    if(tiempoCliente<=10){

        contadorCliente.style.color="#dc2626";
        progreso.style.background="#dc2626";

    }

}

// ======================================
// SONIDO
// ======================================

function beep(){

    try{

        new Audio(
            "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        ).play();

    }catch(e){}

}

// ======================================
// INICIAR TEMPORIZADOR
// ======================================

function iniciarTemporizador(segundos){

    clearInterval(intervaloCliente);

    tiempoCliente=segundos;
    tiempoInicial=segundos;

    actualizarTemporizador();

    intervaloCliente=setInterval(function(){

        tiempoCliente--;

        if(tiempoCliente<=0){

            clearInterval(intervaloCliente);

            intervaloCliente=null;

            contadorCliente.textContent="⏰";

            contadorCliente.style.color="#dc2626";

            progreso.style.width="0%";

            beep();

            setTimeout(function(){

                tiempoCliente=0;
                tiempoInicial=0;

                actualizarTemporizador();

            },3000);

            return;

        }

        actualizarTemporizador();

    },1000);

}

// ======================================
// BOTONES
// ======================================

btn2min.onclick=function(){

    iniciarTemporizador(120);

}

btn3min.onclick=function(){

    iniciarTemporizador(180);

}

btn5min.onclick=function(){

    iniciarTemporizador(300);

}

btn7min.onclick=function(){

    iniciarTemporizador(420);

}

btnCancelar.onclick=function(){

    clearInterval(intervaloCliente);

    intervaloCliente=null;

    tiempoCliente=0;
    tiempoInicial=0;

    actualizarTemporizador();

}

// ======================================

actualizarTemporizador();