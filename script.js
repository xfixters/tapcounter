// ==========================
// ELEMENTOS
// ==========================

const counter = document.getElementById("counter");
const tapButton = document.getElementById("tapButton");
const minusButton = document.getElementById("minusButton");
const resetButton = document.getElementById("resetButton");


// ==========================
// CARGAR DATOS
// ==========================

let count = Number(localStorage.getItem("tapCount")) || 0;

let lastDate = localStorage.getItem("lastDate");


// ==========================
// COMPROBAR DÍAS TRANSCURRIDOS
// ==========================

function checkDays() {

    const today = new Date();

    // Fecha actual en formato YYYY-MM-DD
    const todayString = today.toLocaleDateString("en-CA");

    // Primera vez usando el contador
    if (!lastDate) {

        localStorage.setItem("lastDate", todayString);
        return;
    }

    // Convertir las fechas a objetos Date
    const last = new Date(lastDate + "T00:00:00");
    const current = new Date(todayString + "T00:00:00");

    // Diferencia en milisegundos
    const difference = current - last;

    // Convertir a días
    const daysPassed = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    // Sumar un punto por cada día
    if (daysPassed > 0) {

        count += daysPassed;

        localStorage.setItem("tapCount", count);
        localStorage.setItem("lastDate", todayString);
    }
}


// ==========================
// ACTUALIZAR CONTADOR
// ==========================

function updateCounter() {
    counter.textContent = count;
}


// ==========================
// GUARDAR CONTADOR
// ==========================

function saveCounter() {

    localStorage.setItem("tapCount", count);

    const today = new Date();
    const todayString = today.toLocaleDateString("en-CA");

    localStorage.setItem("lastDate", todayString);
}


// ==========================
// TAP +1
// ==========================

tapButton.addEventListener("click", () => {

    count++;

    updateCounter();
    saveCounter();

    if (navigator.vibrate) {
        navigator.vibrate(20);
    }
});


// ==========================
// RESTAR -1
// ==========================

minusButton.addEventListener("click", () => {

    if (count > 0) {

        count--;

        updateCounter();
        saveCounter();

        if (navigator.vibrate) {
            navigator.vibrate(20);
        }
    }
});


// ==========================
// RESET
// ==========================

resetButton.addEventListener("click", () => {

    count = 0;

    updateCounter();
    saveCounter();

    if (navigator.vibrate) {
        navigator.vibrate([30, 30, 30]);
    }
});


// ==========================
// COMPROBAR AL ABRIR
// ==========================

checkDays();

updateCounter();


// ==========================
// COMPROBAR CAMBIO DE DÍA
// ==========================

// Comprueba cada minuto si cambió el día
setInterval(() => {

    const oldCount = count;

    checkDays();

    if (count !== oldCount) {
        updateCounter();
    }

}, 60000);
