// Variables
let numSecreto = 0;
let intentos = 0;
let numMax = 10
//Listas
let listaNumSorteados = [];
/* se crea una funcion que haga lo mismo que estas líneas de código y sea genérica para usarla varias veces

let titulo = document.querySelector('h1');
titulo.innerHTML = 'Juego del número secreto';

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10'; */

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return; //  No retorna nada específicamente, se coloca como una buena práctica
}

function verificarIntento() {
    let numUsuario = parseInt(document.getElementById('valorUsuario').value); //  Va a interactuar con la etiqueta 'input' id='valorUsuario' de HTML / '.value' toma el valor del objeto
    /*  Uso de la consola para verificar la igualdad o no, del nº ingresado por usuario con el nº secreto:
    console.log(numSecreto);
    console.log(numUsuario);
    console.log(numSecreto === numUsuario); -> True / False - El "===" indica que tiene que comprar y ser igual valor e igual tipo de dato */

    document.getElementById('reiniciar').removeAttribute('disabled'); // Va a habilitar el botón "nuevo juego", cuando el usuario gane.

    if (numSecreto === numUsuario){
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
    } else {
        if (numUsuario > numSecreto){
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
        document.querySelector('#reiniciar').setAttribute('disabled','true');
    }
    return;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = ''; //  El "#" indica que estas buscando por ID.

    /* Versión larga:
    let valorCaja = document.querySelector('#valorUsuario');
    valorCaja.value = ''; */
}

function generarNumSecreto() {
    //  Genera un nº del 1 al 10.
    let numGenerado = Math.floor(Math.random()*numMax)+1;

    //Si ya se sortearon todos los nº posibles (evitar el error en la recursividad)
    if (listaNumSorteados.length == numMax){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles.');
    } else {
        //Si el nº generado está incluído en la lista, genera un nº distinto para que no repita el nº secreto en cada jugada
        if (listaNumSorteados.includes(numGenerado)) { // includes -> recorre la lista para ver si ese algo existe y devuelve true/false
            return generarNumSecreto(); // la funcion se autoinvoca -> recursividad
        } else {
            listaNumSorteados.push(numGenerado);
            return numGenerado;
        }
    }
}

function condicionesIniciales(){
    //  Título.
    asignarTextoElemento('h1', 'Juego del número secreto');
    //  Ingreso de número para el usuario.
    asignarTextoElemento('p', `Indica un número del 1 al ${numMax}`);
    //  Generar el nº secreto.
    numSecreto = generarNumSecreto();
    //  Inicializar el nº de intentos.
    intentos = 1;
}

function reiniciarJuego(){
    //  Limpiar la caja.
    limpiarCaja();
    //  Traer las condiciones iniciales.
    condicionesIniciales();
    //  Deshabilitar el botón "nuevo juego".
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales()