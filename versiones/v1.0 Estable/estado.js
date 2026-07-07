// ======================================
// AVAYA ASSISTANT v1.0
// estado.js
// ======================================

// Estado del turno
let turnoIniciado = false;
let estadoActual = "conectado";

// Tiempos acumulados
let tiempoDisponible = 0;
let tiempoOcupado = 0;
let tiempoDescanso = 0;
let tiempoComida = 0;