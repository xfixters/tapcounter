// Obtener elementos
const counter = document.getElementById("counter");
const tapButton = document.getElementById("tapButton");
const minusButton = document.getElementById("minusButton");
const resetButton = document.getElementById("resetButton");

// Cargar contador guardado
let count = Number(localStorage.getItem("tapCount")) || 0;

// Mostrar contador
updateCounter();


// ==========================
// SUMAR TAP
// ==========================

tapButton.addEventListener("click", () => {
    count++;
    updateCounter();
    saveCounter();

    // Vibración en teléfonos compatibles
    if (navigator.vibrate) {
        navigator.vibrate(20);
    }
});


// ==========================
// RESTAR
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
}
