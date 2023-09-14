let puntosUsuario = 0;
let puntosPC = 0;

let isntrucciones = document.querySelector("#instrucciones");
let contenedorPuntosUsuarios = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let mensajes = document.querySelector("#mensaje");
let contenedorGanaPunto = document.querySelector("#gana-punto");
let elegirTuArma = document.querySelector("#elegir-tu-arma");

let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
let contenedorEleccionPC = document.querySelector("#eleccion-computadora");

let botonesArmas = document.querySelectorAll(".arma");
botonesArmas.forEach(boton => {
    boton.addEventListener("click", iniciarTurno)
});

function iniciarTurno(e){
    let eleccionPC = Math.floor(Math.random() *3);
    let eleccionUsuario =e.currentTarget.id;

    // piedra => 0
    // papel => 1
    // tijera => 2

    if (eleccionPC === 0) {
        eleccionPC = "piedra ✊🏼"
    } else if (eleccionPC === 1) {
        eleccionPC = "papel ✋🏼"
    } else if (eleccionPC === 2) {
        eleccionPC = "tijera ✌🏼"
    }

    // piedra vence a tijera
    // tijera vence a papel
    // papel vence a piedra
    // si son iguales son empates
    
    if (
        (eleccionUsuario === "piedra ✊🏼" && eleccionPC === "tijera ✌🏼") ||
        (eleccionUsuario === "tijera ✌🏼" && eleccionPC === "papel ✋🏼" ) ||
        (eleccionUsuario === "papel ✋🏼" && eleccionPC === "piedra ✊🏼")
    ) {
        ganaUsuario();

    } else if (
        (eleccionPC === "piedra ✊🏼" && eleccionUsuario === "tijera ✌🏼") ||
        (eleccionPC === "tijera ✌🏼" && eleccionUsuario === "papel ✋🏼" ) ||
        (eleccionPC === "papel ✋🏼" && eleccionUsuario === "piedra ✊🏼")
    ) {
        ganaPC();

    } else {

        empate();
    }

    mensajes.classList.remove("disable");
    contenedorEleccionUsuario.innerHTML = eleccionUsuario;
    contenedorEleccionPC.innerHTML = eleccionPC;

    if (puntosUsuario === 5 || puntosPC === 5) {

        if(puntosUsuario === 5) {
            isntrucciones.innerHTML = "🎉 ¡Ganaste el juego! 🎉"
        }

        if(puntosPC === 5) {
            isntrucciones.innerHTML = "😭 ¡La computadora ha ganado! 😭"
        }

        elegirTuArma.classList.add("disable");
        reiniciar.classList.remove("disable");
        reiniciar.addEventListener("click", reiniciarJuego);
    }
}

function ganaUsuario() {
    puntosUsuario++;
    contenedorPuntosUsuarios.innerHTML = puntosUsuario;
    contenedorGanaPunto.innerHTML = "¡Ganaste un punto! ✨"
}

function ganaPC(){
    puntosPC++;
    contenedorPuntosPC.innerHTML = puntosPC;
    contenedorGanaPunto.innerHTML = "¡La computadora gano un punto! 😢";
}

function empate(){
    contenedorGanaPunto.innerHTML = "¡Empate! 😲";
}

function reiniciarJuego() {
    reiniciar.classList.add("disable");
    elegirTuArma.classList.remove("disable");
    mensajes.classList.add("disable");

    puntosUsuario = 0;
    puntosPC = 0;

    contenedorPuntosUsuarios.innerHTML = puntosUsuario;
    contenedorPuntosPC.innerHTML = puntosPC;

    isntrucciones.innerHTML ="El primero en llegar a 5 puntos gana";


}