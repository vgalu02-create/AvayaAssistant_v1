// ======================================
// AVAYA ASSISTANT V3
// motorTiempo.js
// ======================================

const motorTiempo = {

    iniciado: false,

    inicioTurno: 0,

    estadoActual: "conectado",

    inicioEstado: 0,

    tiempos: {
        disponible: 0,
        ocupado: 0,
        descanso: 0,
        comida: 0
    },

    iniciarTurno() {

        this.iniciado = true;

        this.inicioTurno = Date.now();

        this.inicioEstado = Date.now();

        this.estadoActual = "conectado";

    },

    finalizarTurno() {

        this.actualizarEstado();

        this.iniciado = false;

    },

    cambiarEstado(nuevoEstado) {

        if (!this.iniciado) return;

        this.actualizarEstado();

        this.estadoActual = nuevoEstado;

        this.inicioEstado = Date.now();

    },

    actualizarEstado() {

        if (!this.iniciado) return;

        const ahora = Date.now();

        const tiempo = ahora - this.inicioEstado;

        if (this.tiempos[this.estadoActual] !== undefined) {

            this.tiempos[this.estadoActual] += tiempo;

        }

        this.inicioEstado = ahora;

    },

    tiempoTurno() {

        if (!this.iniciado) return 0;

        return Date.now() - this.inicioTurno;

    },

    tiempoEstado(nombre) {

        let tiempo = this.tiempos[nombre] || 0;

        if (this.estadoActual === nombre && this.iniciado) {

            tiempo += Date.now() - this.inicioEstado;

        }

        return tiempo;

    },

    formato(ms) {

        const total = Math.floor(ms / 1000);

        const h = String(Math.floor(total / 3600)).padStart(2, "0");
        const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
        const s = String(total % 60).padStart(2, "0");

        return `${h}:${m}:${s}`;

    }

};
